"use strict";

// Carga en DatoCMS el contenido de docs/contenido-nansystems.md (español e inglés).
//
//   node tools/datocms/load-content.js --env contenido-2026-10                 (SIMULACRO: muestra qué cambiaría)
//   node tools/datocms/load-content.js --env contenido-2026-10 --apply         (escribe en ese entorno)
//   --only grupo1,grupo2   (venture, aboutnew, about, technology, work, certs, credits, testimony, seo, blog)
//   --show-payloads        (en el simulacro, enseña también el JSON que se enviaría a la API)
//
// Reglas:
// - Por defecto es un simulacro: lee, calcula y enseña las diferencias; no escribe nada.
// - Se niega a escribir en `main` (producción). Usa un entorno de pruebas (`node tools/datocms/env.js fork <nombre>`)
//   y, cuando el contenido esté aprobado, promuévelo desde el panel o con `env.js promote`.
// - Es repetible: una segunda ejecución sobre el mismo entorno no debe mostrar cambios (comprobación al terminar).
// - Imágenes: usa las del kit que haya subido `upload-kit.js` (tools/datocms/.state/<entorno>-uploads.json). Sin ellas
//   se conservan las que ya tienen los registros.
// - Con --apply usa el token de escritura de datocms-write.env. Nunca se imprimen tokens.

const fs = require("fs");
const path = require("path");
const { ROOT, Dato, log, parseArgs, redact, explain } = require("./lib");

const MD = path.join(ROOT, "docs", "contenido-nansystems.md");
const STATE_DIR = path.join(__dirname, ".state");
const LOCALES = ["es", "en"];

// Identificadores de modelo (item_type) para crear registros.
const TYPE_ID = {
  technology: "478036",
  work_experience: "463547",
  certification: "463599",
  blog_post: "463345",
};

// ───────────────────────── contenido ─────────────────────────

const END =
  "(?=\\n\\n(?:### \\[|### \\d+\\.\\d|#### |### Entrada |### Artículo |### Testimonio |## \\d+\\. )|$)";
const BLOCK = new RegExp(
  "### \\[([^\\]]+)\\] ([^\\n]+)\\n\\*\\*ES\\*\\*\\n([\\s\\S]*?)\\n\\n\\*\\*EN\\*\\*\\n([\\s\\S]*?)" + END,
  "g"
);

const loadContent = () => {
  const md = fs.readFileSync(MD, "utf8").replace(/\r\n/g, "\n");
  const map = new Map();
  let m;
  while ((m = BLOCK.exec(md))) map.set(`${m[1]}|${m[2]}`, { es: m[3].trim(), en: m[4].trim() });
  return map;
};

const content = loadContent();
const C = (key, id) => {
  const v = content.get(`${key}|${id}`);
  if (!v) throw new Error(`Falta en el documento: [${key}] ${id}`);
  return v;
};

// ───────────────────────── comparación ─────────────────────────

// La API devuelve las fechas con el huso del proyecto (por ejemplo "+01:00" en verano) y las cadenas vacías en lugar
// de null: para decidir si hay cambios se comparan fecha y hora locales y se iguala "" con null.
const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
const norm = (v) => {
  if (v === undefined || v === null) return null;
  if (typeof v !== "string") return v;
  const t = v.replace(/\r\n/g, "\n").trim();
  if (!t) return null;
  // Las fechas se comparan por su hora local (sin el huso): el proyecto guarda `…T00:00:00+01:00` en verano.
  return ISO_DATE.test(t) ? t.slice(0, 19) : t;
};
const same = (a, b) => JSON.stringify(norm(a)) === JSON.stringify(norm(b));
const short = (v) => {
  const s = typeof v === "string" ? v : JSON.stringify(v);
  const one = String(s === undefined ? "∅" : s).replace(/\s+/g, " ");
  return one.length > 64 ? one.slice(0, 61) + "…" : one;
};

// Una operación sobre un registro: acumula los atributos que de verdad cambian.
class Op {
  constructor(kind, model, label, current) {
    this.kind = kind; // update | create | delete | unpublish | publish
    this.model = model;
    this.label = label;
    this.current = current || null;
    this.id = current ? current.id : null;
    this.attrs = {};
    this.changes = [];
  }

  get attrsOld() {
    return (this.current && this.current.attributes) || {};
  }

  // Campo localizado: { es, en }
  loc(field, value) {
    const cur = this.attrsOld[field] || {};
    const diff = LOCALES.filter((l) => !same(cur[l], value[l]));
    if (!diff.length && this.current) return this;
    this.attrs[field] = { es: value.es, en: value.en };
    (diff.length ? diff : LOCALES).forEach((l) => this.changes.push({ field: `${field}[${l}]`, old: cur[l], neu: value[l] }));
    return this;
  }

  // Campo sin idioma
  plain(field, value) {
    const cur = this.attrsOld[field];
    if (this.current && same(cur, value)) return this;
    this.attrs[field] = value;
    this.changes.push({ field, old: cur, neu: value });
    return this;
  }

  // Campo de archivo (imagen): conserva alt, foco, etc. del valor actual y cambia solo el upload_id.
  image(field, uploadId) {
    if (!uploadId) return this;
    const cur = this.attrsOld[field];
    if (cur && String(cur.upload_id) === String(uploadId)) return this;
    const base = cur || { alt: null, title: null, custom_data: {}, focal_point: null, poster_time: null };
    this.attrs[field] = Object.assign({}, base, { upload_id: String(uploadId) });
    this.changes.push({ field, old: cur ? `imagen ${cur.upload_id}` : null, neu: `imagen ${uploadId}` });
    return this;
  }

  // Campo SEO localizado: se cambian título y descripción y se conserva el resto (imagen, etc.).
  seo(field, value) {
    const cur = this.attrsOld[field] || {};
    const out = {};
    let any = false;
    LOCALES.forEach((l) => {
      const old = cur[l] || {};
      const neu = Object.assign({ image: null, twitter_card: "summary_large_image", no_index: false }, old, {
        title: value[l].title,
        description: value[l].description,
      });
      out[l] = neu;
      ["title", "description"].forEach((k) => {
        if (!same(old[k], neu[k])) {
          any = true;
          this.changes.push({ field: `${field}[${l}].${k}`, old: old[k], neu: neu[k] });
        }
      });
    });
    if (any || !this.current) this.attrs[field] = out;
    return this;
  }

  // Campo de bloques localizado: `patches[l]` = lista (en el orden actual) de {attributes} a aplicar a cada bloque.
  blocks(field, patches) {
    const cur = this.attrsOld[field] || {};
    const out = {};
    let any = false;
    LOCALES.forEach((l) => {
      const list = cur[l] || [];
      if (list.length !== patches[l].length) {
        throw new Error(`${this.label}: ${field}[${l}] tiene ${list.length} bloques y se esperaban ${patches[l].length}`);
      }
      out[l] = list.map((b, i) => {
        const patch = patches[l][i];
        const real = {};
        Object.keys(patch).forEach((k) => {
          const neu = patch[k];
          const old = b.attributes[k];
          if (neu && typeof neu === "object" && "upload_id" in neu) {
            if (old && String(old.upload_id) === String(neu.upload_id)) return;
            real[k] = Object.assign({}, old || {}, { upload_id: String(neu.upload_id) });
            this.changes.push({ field: `${field}[${l}][${i + 1}].${k}`, old: old ? `imagen ${old.upload_id}` : null, neu: `imagen ${neu.upload_id}` });
          } else if (!same(old, neu)) {
            real[k] = neu;
            this.changes.push({ field: `${field}[${l}][${i + 1}].${k}`, old, neu });
          }
        });
        if (!Object.keys(real).length) return b.id;
        any = true;
        return { id: b.id, type: "item", attributes: real };
      });
    });
    if (any) this.attrs[field] = out;
    return this;
  }

  get dirty() {
    return this.kind !== "update" || this.changes.length > 0;
  }
}

// ───────────────────────── plan ─────────────────────────

const buildPlan = async (dato, uploads, only) => {
  const want = (g) => !only || only.includes(g);
  const ops = [];
  const cache = {};
  const items = async (model) => {
    if (!cache[model]) {
      const nested = model === "aboutnew" || model === "venture" ? "&nested=true" : "";
      const rows = await dato.list(`/items?filter%5Btype%5D=${model}${nested}`, nested ? 30 : 100);
      cache[model] = new Map(rows.map((r) => [r.id, r]));
    }
    return cache[model];
  };
  const get = async (model, id, expect) => {
    const r = (await items(model)).get(String(id));
    if (!r) throw new Error(`No existe ${model}#${id} en el entorno (¿ya se cambió o es otro entorno?)`);
    if (expect) {
      const hay = JSON.stringify(r.attributes).toLowerCase();
      if (!hay.includes(expect.toLowerCase())) throw new Error(`${model}#${id} no se parece a lo esperado ("${expect}")`);
    }
    return r;
  };
  const img = (file) => uploads[file] || null;

  // ── venture: texto de bienvenida e imagen lateral
  if (want("venture")) {
    const v = (await items("venture")).values().next().value;
    ops.push(
      new Op("update", "venture", "Servicios · bienvenida", v)
        .loc("welcome", C("venture.welcome", "bienvenida-servicios"))
        .image("side_picture", img("proyectos-edificio.jpg"))
    );
  }

  // ── aboutnew: bienvenida, tres áreas y misión, visión y valores
  if (want("aboutnew")) {
    const a = (await items("aboutnew")).values().next().value;
    const areaImgs = ["tarjeta-conservacion-energia.jpg", "servicio-automatizacion-edificios.jpg", "servicio-infraestructura-it.jpg"].map(img);
    const areas = (l) =>
      [1, 2, 3].map((n, i) => {
        const p = { title: C("itemsabout.title", `tarjeta-${n}`)[l] };
        if (areaImgs[i]) p.image = { upload_id: areaImgs[i] };
        return p;
      });
    const item = (l, k) => ({
      title: C("item.title", `${k}-titulo`)[l],
      shot_title: C("item.shot_title", `${k}-etiqueta`)[l],
      short_description: C("item.short_description", `${k}-resumen`)[l],
      content: C("item.content", `${k}-contenido`)[l],
    });
    ops.push(
      new Op("update", "aboutnew", "Sobre nosotros", a)
        .loc("welcome", C("aboutnew.welcome", "bienvenida"))
        .blocks("aboutarea", { es: areas("es"), en: areas("en") })
        .blocks("item_aboutus", {
          es: ["mision", "vision", "valores"].map((k) => item("es", k)),
          en: ["mision", "vision", "valores"].map((k) => item("en", k)),
        })
    );
  }

  // ── about: biografía de Ana
  if (want("about")) {
    const b = await get("about", "13221067", "Soy Ingeniera");
    ops.push(
      new Op("update", "about", "Biografía de Ana", b)
        .loc("welcome", C("about.welcome", "presentacion"))
        .loc("engineer", C("about.engineer", "biografia"))
    );
  }

  // ── technology: cuatro servicios (3 registros reutilizados y 1 nuevo)
  if (want("technology")) {
    const reuse = { 1: "14202263", 2: "14202283", 3: "14202349" };
    const cover = { 1: "blog-eficiencia-energetica.jpg", 2: "servicio-automatizacion-edificios.jpg", 3: "servicio-infraestructura-it.jpg", 4: "servicio-diseno-cad.jpg" };
    const all = await items("technology");
    for (let n = 1; n <= 4; n += 1) {
      const slug = C("technology.slug", `s${n}-slug`).en;
      const current = reuse[n] ? await get("technology", reuse[n]) : [...all.values()].find((r) => r.attributes.slug === slug);
      const op = new Op(current ? "update" : "create", "technology", `Servicio ${n} · ${C("technology.title", `s${n}-titulo`).en}`, current);
      op.loc("title", C("technology.title", `s${n}-titulo`))
        .loc("short_title", C("technology.short_title", `s${n}-titulo-corto`))
        .loc("short_description", C("technology.short_description", `s${n}-resumen`))
        .loc("content", C("technology.content", `s${n}-contenido`))
        .loc("categories", C("technology.categories", `s${n}-categorias`))
        .plain("slug", slug)
        .seo("seo_settings", {
          es: { title: C("seo.title", `s${n}-titulo`).es, description: C("seo.description", `s${n}-descripcion`).es },
          en: { title: C("seo.title", `s${n}-titulo`).en, description: C("seo.description", `s${n}-descripcion`).en },
        });
      let file = img(cover[n]);
      if (!file && !current) {
        // Obligatoria al crear: mientras no haya imagen del kit se reutiliza la de otro servicio.
        const fallback = [...all.values()][0];
        file = fallback && fallback.attributes.cover_image.upload_id;
      }
      op.image("cover_image", file);
      ops.push(op);
    }
  }

  // ── work_experience: siete entradas (5 existentes actualizadas, 1 reutilizada, 1 nueva) y 5 borradas
  if (want("work")) {
    const iso = (d) => `${d}T00:00:00+00:00`;
    const E = [
      { k: "e1", id: null, dates: ["2022-08-01", "2024-08-31"], url: "https://www.austinisd.org/", find: (r) => r.attributes.company.en === "Austin ISD" && String(r.attributes.date_in.en).startsWith("2022") },
      { k: "e2", id: "13220888", expect: "Energy Conservation Specialist", dates: ["2019-07-01", "2022-07-31"], url: "https://www.austinisd.org/" },
      { k: "e3", id: "13220864", expect: "EZCORP", dates: ["2018-04-01", "2019-09-30"], url: null },
      { k: "e4", id: "13215668", expect: "Harrisburg Housing Authority", dates: ["2017-04-01", "2018-03-31"], url: "https://www.harrisburghousing.org/" },
      { k: "e5", id: "13215219", expect: "Messiah College", dates: ["2015-01-01", "2016-08-31"], url: "https://www.messiah.edu/" },
      { k: "e6", id: "13215648", expect: "Voith Hydro", dates: ["2016-05-01", "2016-07-31"], url: null, keepUrl: true },
      { k: "e7", id: "13215182", expect: "LEPA", dates: ["2011-09-01", "2013-08-31"], url: null },
    ];
    const all = await items("work_experience");
    for (const e of E) {
      const current = e.id ? await get("work_experience", e.id, e.expect) : [...all.values()].find(e.find);
      const op = new Op(current ? "update" : "create", "work_experience", `Portafolio ${e.k} · ${C("work_experience.job_title", `${e.k}-cargo`).en}`, current);
      op.loc("job_title", C("work_experience.job_title", `${e.k}-cargo`))
        .loc("company", C("work_experience.company", `${e.k}-empresa`))
        .loc("place", C("work_experience.place", `${e.k}-lugar`))
        .loc("date_in", { es: iso(e.dates[0]), en: iso(e.dates[0]) })
        .loc("date_out", { es: iso(e.dates[1]), en: iso(e.dates[1]) })
        .loc("job_description", C("work_experience.job_description", `${e.k}-descripcion`))
        .loc("responsibilities", C("work_experience.responsibilities", `${e.k}-responsabilidades`))
        .loc("summary_tasks", C("work_experience.summary_tasks", `${e.k}-tareas`));
      const acc = C("work_experience.accomplishments", `${e.k}-logros`);
      // Sin logros se carga "—" (la web lo trata como vacío): con null, el CMS rellena un texto de ejemplo al crear.
      op.loc("accomplishments", { es: acc.es, en: acc.en });
      if (!e.keepUrl) op.plain("url_company", e.url);
      if (!current) {
        // Campos obligatorios que la web no muestra nunca.
        op.loc("salary", { es: 0, en: 0 }).loc("opinion_about_company", { es: "—", en: "—" });
      }
      ops.push(op);
    }
    const drop = [
      ["13220716", "Foot Locker"],
      ["13220873", "Southwest Key"],
      ["13215178", "FIFA"],
      ["13215169", "CECOR"],
      ["13215193", "GOMAX"],
    ];
    for (const [id, expect] of drop) {
      const r = all.get(id);
      if (r) {
        if (!JSON.stringify(r.attributes).includes(expect)) throw new Error(`work_experience#${id} no es "${expect}"`);
        ops.push(new Op("delete", "work_experience", `Borrar ${expect} (queda en el respaldo y en docs/cv-ana-echeverria.md)`, r));
      }
    }
  }

  // ── certification
  if (want("certs")) {
    const map = { c2: "13221241", c3: "13221192", c4: "13221237", c5: "13221094", c6: "13221082", c7: "13221189", c8: "13221228", c9: "13221102", c10: "13221200" };
    const all = await items("certification");
    for (let n = 1; n <= 10; n += 1) {
      const k = `c${n}`;
      const title = C("certification.title", `${k}-titulo`);
      const current = map[k] ? await get("certification", map[k]) : [...all.values()].find((r) => r.attributes.title.en === title.en);
      const op = new Op(current ? "update" : "create", "certification", `Certificación ${k} · ${title.en}`, current);
      op.loc("title", title).loc("description", C("certification.description", `${k}-descripcion`));
      const area = content.get(`certification.area_expertise|${k}-area`);
      if (area) op.loc("area_expertise", area);
      if (!current) {
        // LEED Green Associate: es obligatoria `issued_date`; la web no la muestra.
        op.loc("issued_date", { es: "2021-01-01T00:00:00+00:00", en: "2021-01-01T00:00:00+00:00" });
      }
      ops.push(op);
    }
  }

  // ── credit: EmailJS ya no se usa (formularios en Netlify Forms)
  if (want("credits")) {
    const all = await items("credit");
    for (const r of all.values()) {
      if (/emailjs\.com/i.test(r.attributes.url || "")) {
        ops.push(new Op("delete", "credit", "Borrar crédito de EmailJS (ya no se usa)", r));
      }
    }
  }

  // ── testimony: tres registros existentes (se conservan sus fotos) y sin enlace de perfil
  if (want("testimony")) {
    const map = { t1: "14779493", t2: "14779531", t3: "14779461" };
    for (const k of Object.keys(map)) {
      const r = await get("testimony", map[k]);
      ops.push(
        new Op("update", "testimony", `Testimonio ${k}`, r)
          .loc("title", C("testimony.title", `${k}-frase`))
          .loc("content", C("testimony.content", `${k}-cuerpo`))
          .loc("name", C("testimony.name", `${k}-nombre`))
          .plain("url_profile", null)
      );
    }
  }

  // ── SEO de las páginas
  if (want("seo")) {
    const pages = [
      ["info_site", "13224294", "inicio", "Inicio"],
      ["about", "13221067", "sobre", "Sobre nosotros"],
      ["seo_venture", "13964052", "servicios", "Servicios"],
      ["seo_portfolio", "13964050", "portafolio", "Portafolio"],
      ["seo_blog", "13964169", "blog", "Blog"],
      ["seo_contact", "13964053", "contacto", "Contacto"],
    ];
    for (const [model, id, k, label] of pages) {
      const r = await get(model, id);
      const t = (key) => C(`seo.${key}`, `${k}-${key === "title" ? "titulo" : "descripcion"}`);
      ops.push(
        new Op("update", model, `SEO · ${label}`, r).seo("seo_settings", {
          es: { title: t("title").es, description: t("description").es },
          en: { title: t("title").en, description: t("description").en },
        })
      );
    }
  }

  // ── blog: se despublican las 5 pruebas y se crean 2 artículos reales
  if (want("blog")) {
    const all = await items("blog_post");
    const posts = [
      { k: "a1", cover: "blog-eficiencia-energetica.jpg", date: "2026-10-06T12:00:00+00:00" },
      { k: "a2", cover: "servicio-automatizacion-edificios.jpg", date: "2026-10-13T12:00:00+00:00" },
    ];
    const newSlugs = posts.map((p) => C("blog_post.slug", `${p.k}-slug`).en);
    for (const r of all.values()) {
      if (!newSlugs.includes(r.attributes.slug) && r.meta.status !== "draft") {
        ops.push(new Op("unpublish", "blog_post", `Despublicar prueba: ${r.attributes.slug}`, r));
      }
    }
    for (const p of posts) {
      const slug = C("blog_post.slug", `${p.k}-slug`).en;
      const current = [...all.values()].find((r) => r.attributes.slug === slug);
      const op = new Op(current ? "update" : "create", "blog_post", `Artículo ${p.k} · ${C("blog_post.title", `${p.k}-titulo`).en}`, current);
      op.loc("title", C("blog_post.title", `${p.k}-titulo`))
        .loc("content", C("blog_post.content", `${p.k}-contenido`))
        .loc("categories", C("blog_post.categories", `${p.k}-categorias`))
        .loc("date_published", { es: p.date, en: p.date })
        .plain("slug", slug);
      if (!current) op.loc("kat", { es: [], en: [] });
      let file = img(p.cover);
      if (!file && !current) file = [...all.values()][0].attributes.cover_image.upload_id;
      op.image("cover_image", file);
      ops.push(op);
      if (!current || op.changes.length || current.meta.status !== "published") {
        ops.push(Object.assign(new Op("publish", "blog_post", `Publicar ${p.k} (solo en el entorno de pruebas)`, current), { pendingCreate: op }));
      }
    }
  }

  return ops;
};

// ───────────────────────── ejecución ─────────────────────────

const apply = async (dato, ops) => {
  const created = new Map();
  for (const op of ops) {
    if (op.kind === "update") {
      if (!op.changes.length) continue;
      await dato.put(`/items/${op.id}`, { data: { type: "item", id: op.id, attributes: op.attrs } });
      log(`  ✔ actualizado ${op.model}#${op.id}  ${op.label}`);
    } else if (op.kind === "create") {
      const res = await dato.post("/items", {
        data: { type: "item", attributes: op.attrs, relationships: { item_type: { data: { type: "item_type", id: TYPE_ID[op.model] } } } },
      });
      created.set(op, res.data.id);
      op.id = res.data.id;
      log(`  ✔ creado ${op.model}#${op.id}  ${op.label}`);
    } else if (op.kind === "delete") {
      await dato.del(`/items/${op.id}`);
      log(`  ✔ borrado ${op.model}#${op.id}  ${op.label}`);
    } else if (op.kind === "unpublish") {
      await dato.put(`/items/${op.id}/unpublish`);
      log(`  ✔ despublicado ${op.model}#${op.id}`);
    } else if (op.kind === "publish") {
      const id = op.id || (op.pendingCreate && op.pendingCreate.id);
      await dato.put(`/items/${id}/publish`);
      log(`  ✔ publicado ${op.model}#${id}`);
    }
  }
};

// ───────────────────────── validación previa ─────────────────────────
// Lee del esquema real las reglas de longitud de cada campo y revisa lo que se va a enviar, para no descubrir un
// `shot_title` demasiado corto a mitad de la carga (la API rechaza el registro entero).

const RULE_MODELS = ["technology", "work_experience", "certification", "testimony", "blog_post", "about", "info_site", "seo_venture", "seo_portfolio", "seo_blog", "seo_contact", "aboutnew", "itemsabout", "item", "venture"];
const BLOCK_MODEL = { aboutarea: "itemsabout", item_aboutus: "item" };

const loadRules = async (dato) => {
  const types = (await dato.get("/item-types")).data.filter((t) => RULE_MODELS.includes(t.attributes.api_key));
  const rules = {};
  for (const t of types) {
    const fields = (await dato.get(`/item-types/${t.id}/fields`)).data;
    rules[t.attributes.api_key] = {};
    fields.forEach((f) => {
      rules[t.attributes.api_key][f.attributes.api_key] = { type: f.attributes.field_type, validators: f.attributes.validators || {} };
    });
  }
  return rules;
};

const lengthProblems = (where, value, validators, type) => {
  const out = [];
  const text = typeof value === "string" ? value.trim() : null;
  if (text === null) return out;
  const len = validators.length;
  if (len && text.length) {
    if (len.min !== undefined && text.length < len.min) out.push(`${where}: "${text}" tiene ${text.length} caracteres y el mínimo es ${len.min}`);
    if (len.max !== undefined && text.length > len.max) out.push(`${where}: tiene ${text.length} caracteres y el máximo es ${len.max}`);
  }
  if (type === "slug" && text && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(text)) out.push(`${where}: "${text}" no es un slug válido`);
  return out;
};

const validate = (ops, rules) => {
  const problems = [];
  ops.forEach((op) => {
    if (!(op.kind === "update" || op.kind === "create")) return;
    const modelRules = rules[op.model] || {};
    Object.keys(op.attrs).forEach((field) => {
      const rule = modelRules[field];
      if (!rule) return;
      const v = op.attrs[field];
      const where = `${op.label} · ${field}`;
      if (rule.type === "rich_text") {
        const blockRules = rules[BLOCK_MODEL[field]] || {};
        LOCALES.forEach((l) =>
          (v[l] || []).forEach((b, i) => {
            if (typeof b !== "object") return;
            Object.keys(b.attributes).forEach((k) => {
              const br = blockRules[k];
              if (br) problems.push(...lengthProblems(`${where}[${l}][${i + 1}].${k}`, b.attributes[k], br.validators, br.type));
            });
          })
        );
      } else if (rule.type === "seo") {
        LOCALES.forEach((l) => {
          const s = v[l] || {};
          if (s.title && rule.validators.title_length && s.title.length > rule.validators.title_length.max) problems.push(`${where}[${l}].title: ${s.title.length} caracteres (máximo ${rule.validators.title_length.max})`);
          if (s.description && rule.validators.description_length && s.description.length > rule.validators.description_length.max) problems.push(`${where}[${l}].description: ${s.description.length} caracteres (máximo ${rule.validators.description_length.max})`);
        });
      } else if (v && typeof v === "object" && ("es" in v || "en" in v)) {
        LOCALES.forEach((l) => problems.push(...lengthProblems(`${where}[${l}]`, v[l], rule.validators, rule.type)));
      } else {
        problems.push(...lengthProblems(where, v, rule.validators, rule.type));
      }
    });
  });
  return problems;
};

const body = (op) =>
  op.kind === "create"
    ? { data: { type: "item", attributes: op.attrs, relationships: { item_type: { data: { type: "item_type", id: TYPE_ID[op.model] } } } } }
    : { data: { type: "item", id: op.id, attributes: op.attrs } };

const report = (ops, showPayloads) => {
  let changed = 0;
  ops.forEach((op) => {
    if (op.kind === "update" && !op.changes.length) return;
    changed += 1;
    const tag = { update: "ACTUALIZA", create: "CREA", delete: "BORRA", unpublish: "DESPUBLICA", publish: "PUBLICA" }[op.kind];
    log(`\n${tag.padEnd(10)} ${op.model}${op.id ? "#" + op.id : ""}  ${op.label}`);
    if (op.kind === "create") {
      log(`           (${Object.keys(op.attrs).length} campos nuevos)`);
      return;
    }
    op.changes.slice(0, 40).forEach((c) => log(`   ${c.field}: ${short(c.old)}  →  ${short(c.neu)}`));
    if (op.changes.length > 40) log(`   … ${op.changes.length - 40} cambios más`);
    if (showPayloads && (op.kind === "update" || op.kind === "create")) log(`   PAYLOAD: ${JSON.stringify(body(op)).slice(0, 1800)}`);
  });
  return changed;
};

(async () => {
  const { flags } = parseArgs(process.argv.slice(2));
  const env = flags.env;
  if (!env || env === true) throw new Error("Indica el entorno con --env <nombre>.");
  if (env === "main" && !flags["allow-main"]) {
    throw new Error("Este script no escribe en `main` (producción). Usa un entorno de pruebas (node tools/datocms/env.js fork …).");
  }
  const doApply = Boolean(flags.apply);
  const only = typeof flags.only === "string" ? flags.only.split(",").map((s) => s.trim()) : null;

  const stateFile = path.join(STATE_DIR, `${env}-uploads.json`);
  const uploads = fs.existsSync(stateFile) ? JSON.parse(fs.readFileSync(stateFile, "utf8")) : {};
  log(`Entorno: ${env} · imágenes del kit conocidas: ${Object.keys(uploads).length} · piezas del documento: ${content.size}`);
  log(doApply ? "MODO ESCRITURA (--apply)" : "SIMULACRO: no se escribe nada");

  // El simulacro puede apuntar a un entorno que aún no existe: en ese caso lee de `main` (solo lectura).
  const dato = new Dato({ write: doApply, environment: env });
  let ops;
  try {
    ops = await buildPlan(dato, uploads, only);
  } catch (e) {
    if (!doApply && /404|ENVIRONMENT/i.test(e.message)) {
      log("(el entorno todavía no existe: el simulacro compara contra `main`)");
      const readMain = new Dato({ write: false, environment: null });
      ops = await buildPlan(readMain, uploads, only);
    } else {
      throw e;
    }
  }

  const changed = report(ops, Boolean(flags["show-payloads"]));
  const problems = validate(ops, await loadRules(new Dato({ write: false, environment: null })));
  if (problems.length) {
    log(`\nVALIDACIÓN: ${problems.length} campos incumplen las reglas del CMS:`);
    problems.forEach((p) => log(`  ✘ ${p}`));
    if (doApply) throw new Error("Corrige esos campos en docs/contenido-nansystems.md antes de escribir (no se envió nada).");
  } else {
    log("\nVALIDACIÓN: todos los campos cumplen las reglas de longitud del CMS.");
  }
  log(`\n${changed} operaciones con cambios de ${ops.length} revisadas.`);
  if (!doApply) {
    log("Simulacro terminado: repite con --apply para escribir.");
    return;
  }
  await apply(dato, ops);

  // Comprobación: una segunda pasada no debe encontrar cambios.
  const again = await buildPlan(new Dato({ write: true, environment: env }), uploads, only);
  const left = again.filter((o) => (o.kind === "update" && o.changes.length) || o.kind === "create" || o.kind === "delete" || o.kind === "unpublish");
  log(left.length ? `\nATENCIÓN: ${left.length} operaciones siguen pendientes tras escribir:` : "\nComprobación: sin cambios pendientes.");
  left.forEach((o) => log(`  - ${o.kind} ${o.model} ${o.label}`));
})().catch((e) => {
  console.error("ERROR:", explain(redact(e.message)));
  process.exit(1);
});
