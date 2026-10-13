"use strict";

// Entornos (sandbox) de DatoCMS: listar, crear una copia de `main`, promoverla o borrarla.
//
//   node tools/datocms/env.js list
//   node tools/datocms/env.js fork contenido-2026-10      (copia de main; no toca producción)
//   node tools/datocms/env.js promote contenido-2026-10 --yes   (la copia pasa a ser el principal: PUBLICA)
//   node tools/datocms/env.js delete contenido-2026-10 --yes
//
// `fork`, `promote` y `delete` escriben en el proyecto: usan el token de DATOCMS_WRITE_TOKEN.

const { Dato, log, parseArgs, sleep, explain } = require("./lib");

const describe = (e) =>
  `${e.id.padEnd(24)} estado=${e.meta.status} principal=${e.meta.primary} copia_de=${e.meta.forked_from || "-"} ` +
  `último_cambio=${e.meta.last_data_change_at || "-"}`;

(async () => {
  const { flags, rest } = parseArgs(process.argv.slice(2));
  const [cmd, name] = rest;

  if (!cmd || cmd === "list") {
    const dato = new Dato();
    (await dato.get("/environments")).data.forEach((e) => log(describe(e)));
    return;
  }

  if (!name) throw new Error("Falta el nombre del entorno.");
  if (name === "main") throw new Error("Este script no toca `main` directamente.");
  const dato = new Dato({ write: true });

  if (cmd === "fork") {
    await dato.request("POST", "/environments/main/fork?immediate_return=true", {
      data: { id: name, type: "environment" },
    });
    for (let i = 0; i < 90; i += 1) {
      const e = (await dato.get(`/environments/${name}`)).data;
      log(describe(e));
      if (e.meta.status === "ready") return;
      await sleep(4000);
    }
    throw new Error("La copia no quedó lista a tiempo; vuelve a ejecutar `list`.");
  }

  if (cmd === "promote") {
    if (!flags.yes) throw new Error("Promover publica el contenido del entorno en producción. Añade --yes.");
    await dato.request("PUT", `/environments/${name}/promote`);
    log("promovido:", name);
    return;
  }

  if (cmd === "delete") {
    if (!flags.yes) throw new Error("Borrar un entorno no se puede deshacer. Añade --yes.");
    await dato.del(`/environments/${name}`);
    log("borrado:", name);
    return;
  }

  throw new Error(`Comando desconocido: ${cmd}`);
})().catch((e) => {
  console.error("ERROR:", explain(e.message));
  process.exit(1);
});
