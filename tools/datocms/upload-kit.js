"use strict";

// Sube a la mediateca de DatoCMS el kit de imágenes del rediseño (con texto alternativo ES/EN y punto focal),
// a partir de la tabla de su LEEME.md.
//
//   node tools/datocms/upload-kit.js --dir "C:\...\imagenes-para-datocms" --env contenido-2026-10            (simulacro)
//   node tools/datocms/upload-kit.js --dir "C:\...\imagenes-para-datocms" --env contenido-2026-10 --apply    (sube)
//   --files a.jpg,b.jpg   (solo esas; por defecto, todas las de la tabla)
//
// Guarda los identificadores en tools/datocms/.state/<entorno>-uploads.json, que luego usa load-content.js.
// Con --apply usa el token de escritura. Sin `--env` o con `main` se niega (usa un entorno de pruebas).

const fs = require("fs");
const path = require("path");
const https = require("https");
const { Dato, log, parseArgs, redact, explain } = require("./lib");

const STATE_DIR = path.join(__dirname, ".state");

const parseKitTable = (md) => {
  const rows = [];
  let cols = null;
  md.replace(/\r\n/g, "\n")
    .split("\n")
    .forEach((line) => {
      if (!line.trim().startsWith("|")) {
        cols = null;
        return;
      }
      const cells = line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      if (cells[0] === "Archivo") {
        cols = {
          file: 0,
          focal: cells.findIndex((c) => /^Punto focal/.test(c)),
          es: cells.indexOf("Alt ES"),
          en: cells.indexOf("Alt EN"),
        };
        return;
      }
      if (!cols || /^-+$/.test(cells[0].replace(/\s/g, ""))) return;
      const file = cells[cols.file].replace(/`/g, "");
      const focal = (cells[cols.focal] || "").split(",").map((n) => parseFloat(n));
      if (!/\.(jpe?g|png|webp)$/i.test(file) || focal.length < 2 || focal.some(isNaN)) return;
      rows.push({ file, focal: { x: focal[0], y: focal[1] }, es: cells[cols.es], en: cells[cols.en] });
    });
  return rows;
};

const putFile = (url, headers, buffer) =>
  new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: "PUT",
        headers: Object.assign({}, headers, { "Content-Length": buffer.length }),
      },
      (res) => {
        let out = "";
        res.on("data", (c) => (out += c));
        res.on("end", () =>
          res.statusCode < 300 ? resolve() : reject(new Error(`PUT archivo -> ${res.statusCode} ${redact(out.slice(0, 200))}`))
        );
      }
    );
    req.on("error", reject);
    req.write(buffer);
    req.end();
  });

(async () => {
  const { flags } = parseArgs(process.argv.slice(2));
  if (!flags.dir || flags.dir === true) throw new Error('Falta --dir "<carpeta del kit>".');
  const env = flags.env;
  if (!env || env === true || env === "main") throw new Error("Indica un entorno de pruebas con --env (no `main`).");
  const apply = Boolean(flags.apply);

  const md = fs.readFileSync(path.join(flags.dir, "LEEME.md"), "utf8");
  const only = typeof flags.files === "string" ? flags.files.split(",").map((f) => f.trim()) : null;
  const rows = parseKitTable(md)
    .filter((r) => fs.existsSync(path.join(flags.dir, r.file)))
    .filter((r) => !only || only.includes(r.file));
  fs.mkdirSync(STATE_DIR, { recursive: true });
  const stateFile = path.join(STATE_DIR, `${env}-uploads.json`);
  const state = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, "utf8")) : {};

  // En el simulacro el entorno puede no existir todavía: se consulta `main` (solo lectura).
  const dato = new Dato({ write: apply, environment: apply ? env : null });
  const existing = await dato.list("/uploads");
  const byName = new Map(existing.map((u) => [u.attributes.filename, u.id]));

  log(`${rows.length} imágenes en el kit; ${apply ? "SE SUBEN" : "simulacro (no se escribe nada)"} · entorno ${env}`);
  for (const r of rows) {
    const known = state[r.file] || byName.get(r.file);
    if (known) {
      state[r.file] = known;
      log(`  = ${r.file} ya está en la mediateca (id ${known})`);
      continue;
    }
    log(`  + ${r.file}  foco (${r.focal.x}, ${r.focal.y})  alt ES: ${r.es.slice(0, 50)}…`);
    if (!apply) continue;

    const buffer = fs.readFileSync(path.join(flags.dir, r.file));
    const reqRes = await dato.post("/upload-requests", {
      data: { type: "upload_request", attributes: { filename: r.file } },
    });
    const { id: requestId, attributes } = reqRes.data;
    await putFile(attributes.url, attributes.request_headers || {}, buffer);
    const meta = (alt) => ({ alt, title: null, custom_data: {}, focal_point: r.focal, poster_time: null });
    let created = await dato.post("/uploads", {
      data: {
        type: "upload",
        attributes: { path: requestId, default_field_metadata: { es: meta(r.es), en: meta(r.en) } },
      },
    });
    if (created.data && created.data.type === "job") {
      const job = await dato.waitJob(created.data.id);
      created = job && job.data && job.data.attributes && job.data.attributes.payload
        ? { data: job.data.attributes.payload.data }
        : job;
    }
    const uploadId = created && created.data && created.data.id;
    if (!uploadId) throw new Error(`No se obtuvo el id de la subida de ${r.file}: ${redact(JSON.stringify(created).slice(0, 300))}`);
    state[r.file] = uploadId;
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
    log(`    subida lista: id ${uploadId}`);
  }
  if (apply) fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
  log(apply ? `Listo. Identificadores en ${path.relative(process.cwd(), stateFile)}` : "Simulacro terminado. Repite con --apply para subir.");
})().catch((e) => {
  console.error("ERROR:", explain(e.message));
  process.exit(1);
});
