"use strict";

// Cliente mínimo de la API de gestión de DatoCMS (CMA) para los scripts de esta carpeta.
//
// Reglas (docs/datocms-api.md):
// - Los tokens salen de `.env` (`api_key`, solo lectura) y de `datocms-write.env` (`DATOCMS_WRITE_TOKEN`,
//   escritura). Ambos archivos están en .gitignore. Nada se imprime sin pasar por `redact()`.
// - Límite de la API: 60 peticiones cada 3 s. Se espacian las peticiones y se reintenta ante un 429.
// - Compatible con Node 14 (sin dependencias).

const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.resolve(__dirname, "..", "..");

const parseEnvFile = (file) => {
  const out = {};
  if (!fs.existsSync(file)) return out;
  fs.readFileSync(file, "utf8")
    .split(/\r?\n/)
    .forEach((line) => {
      const m = /^\s*([A-Za-z0-9_]+)\s*=\s*(.*?)\s*$/.exec(line);
      if (m) out[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
    });
  return out;
};

const readToken = parseEnvFile(path.join(ROOT, ".env")).api_key;
const writeToken = parseEnvFile(path.join(ROOT, "datocms-write.env")).DATOCMS_WRITE_TOKEN;
const secrets = [readToken, writeToken].filter(Boolean);

// Oculta los valores conocidos y cualquier cadena con forma de token (30 caracteres hexadecimales).
const redact = (value) => {
  let s = typeof value === "string" ? value : JSON.stringify(value);
  secrets.forEach((v) => {
    s = s.split(v).join("[token oculto]");
  });
  return s.replace(/\b[0-9a-f]{30}\b/gi, "[token oculto]");
};
const log = (...args) => console.log(args.map((a) => (typeof a === "string" ? redact(a) : redact(a))).join(" "));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Argumentos: --flag, --clave valor. Lo demás son posicionales.
const parseArgs = (argv) => {
  const flags = {};
  const rest = [];
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith("--")) {
        flags[a.slice(2)] = next;
        i += 1;
      } else {
        flags[a.slice(2)] = true;
      }
    } else {
      rest.push(a);
    }
  }
  return { flags, rest };
};

class Dato {
  // `write`: usa el token de escritura (si no, el de solo lectura). `environment`: entorno (sandbox) o main.
  constructor({ write = false, environment = null } = {}) {
    this.token = write ? writeToken : readToken;
    if (!this.token) {
      throw new Error(
        write
          ? "Falta DATOCMS_WRITE_TOKEN en datocms-write.env (docs/datocms-api.md)."
          : "Falta api_key en .env (docs/setup-local.md)."
      );
    }
    this.environment = environment && environment !== "main" ? environment : null;
    this.write = write;
    this.last = 0;
    this.requests = 0;
  }

  async request(method, apiPath, body, { raw = false, headers = {} } = {}) {
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const wait = 120 - (Date.now() - this.last);
      if (wait > 0) await sleep(wait);
      this.last = Date.now();
      this.requests += 1;
      const res = await this._once(method, apiPath, body, headers);
      if (res.status === 429) {
        const reset = Number(res.headers["x-ratelimit-reset"]) || 3;
        await sleep((reset + 0.5) * 1000);
        continue;
      }
      if (raw) return res;
      if (res.status >= 400) {
        throw new Error(`${method} ${apiPath} -> ${res.status} ${redact(res.text.slice(0, 600))}`);
      }
      return res.json;
    }
    throw new Error(`${method} ${apiPath}: demasiados 429 seguidos`);
  }

  _once(method, apiPath, body, headers) {
    return new Promise((resolve, reject) => {
      const data = body === undefined || body === null ? null : JSON.stringify(body);
      const h = Object.assign(
        {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/json",
          "X-Api-Version": "3",
        },
        this.environment ? { "X-Environment": this.environment } : {},
        data ? { "Content-Type": "application/vnd.api+json", "Content-Length": Buffer.byteLength(data) } : {},
        headers
      );
      const req = https.request({ hostname: "site-api.datocms.com", path: apiPath, method, headers: h }, (res) => {
        // `utf8` evita que un carácter de varios bytes (é, ñ…) se corrompa si la respuesta lo parte en dos trozos.
        res.setEncoding("utf8");
        let out = "";
        res.on("data", (c) => (out += c));
        res.on("end", () => {
          let json = null;
          try {
            json = out ? JSON.parse(out) : null;
          } catch (e) {
            json = null;
          }
          resolve({ status: res.statusCode, headers: res.headers, text: out, json });
        });
      });
      req.on("error", reject);
      if (data) req.write(data);
      req.end();
    });
  }

  get(p) {
    return this.request("GET", p);
  }
  post(p, body) {
    return this.request("POST", p, body === undefined ? {} : body);
  }
  put(p, body) {
    return this.request("PUT", p, body);
  }
  del(p) {
    return this.request("DELETE", p);
  }

  // Lista paginada (100 por página; con `nested=true` la API admite 30 como máximo).
  async list(apiPath, size = 100) {
    const sep = apiPath.includes("?") ? "&" : "?";
    let all = [];
    for (let offset = 0; ; offset += size) {
      const res = await this.get(`${apiPath}${sep}page%5Blimit%5D=${size}&page%5Boffset%5D=${offset}`);
      all = all.concat(res.data);
      if (res.data.length < size) break;
    }
    return all;
  }

  // Espera a que termine un trabajo asíncrono: `/job-results/:id` responde 404 mientras no ha terminado.
  async waitJob(jobId, { tries = 60 } = {}) {
    for (let i = 0; i < tries; i += 1) {
      const res = await this.request("GET", `/job-results/${jobId}`, undefined, { raw: true });
      if (res.status === 200) return res.json;
      if (res.status === 404 || res.status === 202) {
        await sleep(1500);
        continue;
      }
      throw new Error(`job ${jobId} -> ${res.status} ${redact(res.text.slice(0, 300))}`);
    }
    throw new Error(`job ${jobId}: no terminó a tiempo`);
  }
}

// Mensaje de error para los scripts: explica el 401 típico del rol Editor.
const explain = (message) =>
  /INSUFFICIENT_PERMISSIONS/.test(message)
    ? `${message}

El token de escritura tiene el rol Editor: puede editar registros y archivos, pero no crear ni usar entornos (copias de main). ` +
      "Para eso hace falta el \"Full-access API token\" (rol Admin) en datocms-write.env, solo mientras dure la carga (docs/datocms-api.md)."
    : message;

module.exports = { ROOT, Dato, redact, log, parseArgs, sleep, secrets, explain };
