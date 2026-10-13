"use strict";

// Copia de seguridad de SOLO LECTURA del contenido de DatoCMS en archivos JSON.
//
//   node tools/datocms/backup.js --out "C:\ruta\fuera\del\repo\backup-datocms-2026-10-13" [--env main]
//
// Guarda modelos y campos, todos los registros (con sus bloques anidados), la mediateca (metadatos y URL
// pública de cada archivo) y los ajustes del sitio. El respaldo contiene datos que NO deben ir al repositorio
// público (sueldos, correos del boletín): guárdalo fuera de él.

const fs = require("fs");
const path = require("path");
const { Dato, log, parseArgs, redact, explain } = require("./lib");

(async () => {
  const { flags } = parseArgs(process.argv.slice(2));
  if (!flags.out || flags.out === true) throw new Error('Falta --out "<carpeta>" (fuera del repositorio).');
  const out = path.resolve(flags.out);
  if (out.startsWith(path.resolve(__dirname, "..", ".."))) {
    throw new Error("La carpeta de respaldo no puede estar dentro del repositorio (es público).");
  }
  fs.mkdirSync(path.join(out, "items"), { recursive: true });

  const dato = new Dato({ environment: flags.env || null });
  const save = (name, data) => fs.writeFileSync(path.join(out, name), redact(JSON.stringify(data, null, 1)));

  const site = (await dato.get("/site")).data;
  save("site.json", site);
  const types = (await dato.get("/item-types")).data;
  save("item-types.json", types);

  const fields = {};
  const summary = [];
  for (const t of types) {
    const key = t.attributes.api_key;
    fields[key] = (await dato.get(`/item-types/${t.id}/fields`)).data;
    const nested = t.attributes.modular_block ? "" : "&nested=true";
    const items = await dato.list(`/items?filter%5Btype%5D=${key}${nested}`, nested ? 30 : 100);
    save(path.join("items", `${key}.json`), items);
    summary.push(`${key}: ${items.length} registros`);
    log(`${key}: ${items.length} registros`);
  }
  save("fields.json", fields);

  const uploads = await dato.list("/uploads");
  save("uploads.json", uploads);
  summary.push(`mediateca: ${uploads.length} archivos`);

  fs.writeFileSync(
    path.join(out, "LEEME.txt"),
    [
      `Respaldo de DatoCMS (entorno: ${flags.env || "main"})`,
      `Fecha: ${new Date().toISOString()}`,
      `Peticiones: ${dato.requests}`,
      "",
      ...summary,
      "",
      "Contiene datos privados (sueldos, correos): no subir al repositorio.",
    ].join("\n")
  );
  log(`listo: ${out} (${dato.requests} peticiones, ${uploads.length} archivos en la mediateca)`);
})().catch((e) => {
  console.error("ERROR:", explain(e.message));
  process.exit(1);
});
