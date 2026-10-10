# Dev log

Bitácora de sesiones de trabajo. **Una entrada por sesión**, la más reciente arriba.

Qué va aquí y qué no:

| Documento | Responde a |
|---|---|
| **dev-log.md** (este) | ¿Qué se hizo en cada sesión, qué se decidió, qué quedó pendiente y por dónde seguir? |
| [CHANGELOG.md](CHANGELOG.md) | ¿Qué cambió en el repo o en el sitio, y con qué riesgo? |
| [roadmap.md](roadmap.md) | ¿Qué falta por hacer y en qué estado está cada cosa? |

Reglas: nada de secretos ni rutas locales (el repo es público); enlazar con IDs del [roadmap](roadmap.md) (`A1`, `M2`, `R1`…); si algo se dio por hecho sin comprobarlo, decirlo.

## Plantilla (copiar al inicio de la lista, debajo de esta línea)

```markdown
## AAAA-MM-DD · título corto de la sesión

**Rama:** `nombre` · **Commit base:** `abc1234`
**Objetivo:** una línea.

### Hecho
- …

### Decisiones
- … (y el porqué)

### Hallazgos / sorpresas
- …

### Pendiente y abierto
- …

### Próximos pasos
1. …

### Commits de la sesión
- `hash` mensaje   (o "sin commits")
```

---

## 2026-10-10 (2.ª sesión) · Revisión del rediseño, contrato de datos y hallazgo A6

**Rama:** `docs/project-documentation` · **Commit base:** `aa513b3`
**Objetivo:** pedir y revisar el rediseño completo (resto de pantallas + especificaciones) con los datos reales del CMS, corregir lo que falle y dejar el plan de portado.

### Hecho
- **Contrato de datos real:** se sacaron los campos de cada modelo de DatoCMS del esquema de GraphQL del dev server (no solo los que consultan las páginas) y se contrastaron con el contenido publicado (etiquetas HTML que genera el markdown, tamaños y proporciones de imagen, cantidades por modelo).
- **Prompt de rediseño** con ese contrato, las restricciones técnicas (Gatsby 2, React 17, `gatsby-image`, CSS plano, sin instalar nada) y las correcciones ya acordadas de la home. La IA entregó `nansystems-nx`: 12 pantallas + catálogo de componentes + `SPEC.md` + 103 claves i18n nuevas.
- **Revisión independiente** en un navegador real (con las fuentes reales): estático (CSS, i18n, referencias al CMS contra el esquema), responsive en 4 anchos × 2 temas × 2 idiomas, diálogos, formularios, cookies y modo sin JavaScript. Resumen en [redesign.md](redesign.md).
- **Correcciones aplicadas** en el paquete (fuera del repo): errores de validación al reabrir diálogos, cabecera a 320 px, rejillas que se ensanchaban, contratos de Netlify Forms y EmailJS, cookie de consentimiento, SPEC (secciones k y l). Resultado: 208/208 combinaciones sin scroll horizontal.
- **Docs actualizados:** roadmap (A6, R0/R0b hechos, R1a nuevo, decisiones abiertas), redesign (estado, requisitos para portar, pieza vertical) y este dev-log.

### Decisiones
- **Pieza vertical antes del resto (R1a):** layout nuevo + hero de la home con `.nx-media` y `gatsby-image` en una rama aparte, para descubrir los problemas de integración con una pantalla y no con doce.
- **CSS en un solo cambio:** `nx.css` entra y `styles.css` + Bootstrap salen juntos; no se publican migraciones a medias.
- **SSR con `gatsby-ssr.js`** (sin instalar nada) para `<body class="nx-root">`, `lang`, fuentes y tema, salvo que A3 llegue antes.
- **Idioma inicial por detección normalizada** (`es*`/`en*`, otro → `es`); la elección guardada manda.
- **A6 se documenta sin detalles** porque el repo es público: el detalle se comunicó al dueño por otra vía.

### Hallazgos / sorpresas
- **A6 (nuevo, urgente):** una consulta pide campos que la página no muestra y que Gatsby publica en el JSON público de la página. Corrección pequeña y de bajo riesgo en `portfolio.js`.
- Mi comprobación de "footer dentro de `main`" dio un falso positivo: eran los `<footer>` de cada `<article>` (válidos). Y la foto del hero que la IA dijo "ya estar en el repo" no existe en él: todas las imágenes salen de DatoCMS.
- Al arreglar la cabecera aparecieron otros desbordes a 320 px que esa tapaba; la causa común eran 33 rejillas de una columna implícita. La copia actual del banner de cookies trae una "palabra" de 42 caracteres con barras.
- El modo `prefers-reduced-motion` del panel de pruebas está activo: la franja animada no se pudo ver en movimiento (lógica revisada por lectura).

### Pendiente y abierto
- **Arreglar A6** (decisión: ¿en una rama `fix/` propia, antes que nada?) y revisar el contenido correspondiente en DatoCMS.
- Decisiones de la clienta: logo gráfico vs. wordmark, correo de contacto real, cifra "+6 años", modelo de cookies (A4), boletín en el pie.
- Completar los `TODO(tú)` de [deploy-netlify.md](deploy-netlify.md).
- Sin verificar: `gatsby-image` con `.nx-media`, `data-sal`, lectores de pantalla, Safari antiguo, envíos reales.

### Próximos pasos
1. Hacer commit de estos docs.
2. Rama `fix/…` para A6 (cambio mínimo en las consultas de `portfolio.js`), build local y preview.
3. Rama `feat/redesign-…` desde esta y construir R1a (pieza vertical).
4. Según resultado de R1a, planificar R1 completo y el resto de pantallas.

### Commits de la sesión
- Pendiente: el dueño hace el commit de estos cambios en `docs/` (rellenar el hash aquí).

---

## 2026-10-10 · Puesta en marcha, auditoría, documentación y elección del rediseño

**Rama:** `docs/project-documentation` (desde `master`) · **Commit base:** `d3a5b12`
**Objetivo:** levantar el proyecto en local, auditar el código y el despliegue, dejar un plan documentado y decidir la dirección del rediseño mientras la clienta no responde.

### Hecho
- **Entorno local:** `nvm install 14.21.3` falló por un bug de nvm-windows 1.2.2 (busca el zip de npm en otra carpeta temporal). Se instaló a mano con el zip oficial, con el SHA-256 comprobado contra nodejs.org. El proyecto arranca con `npm run develop` en Node 14.21.3 y el token de DatoCMS en `.env`. Procedimiento en [setup-local.md](setup-local.md).
- **Auditoría completa** (lectura de todo el código + dev server + GraphQL local + peticiones GET/HEAD a producción): 5 hallazgos altos, 7 medios y 6 bajos. Detalle y evidencia en [audit-2026-10.md](audit-2026-10.md).
- **Plan de Netlify revisado:** cuenta Free (legacy), 1/300 min de build y 837 MB/100 GB usados. Los previews no generan cargos; el riesgo es la cuota, no el dinero. Ver [deploy-netlify.md](deploy-netlify.md).
- **Documentación creada** en `docs/`: README, setup-local, architecture, deploy-netlify, workflow, audit, roadmap, redesign, CHANGELOG y este dev-log. Solo archivos nuevos.
- **Rediseño:** se compararon las propuestas A, B, C y D. Se muestrearon los colores reales de los PNG y se calcularon los contrastes. Se preparó un prompt para generar una muestra HTML de la home en claro y oscuro (pendiente de ejecutar). Ver [redesign.md](redesign.md).

### Decisiones
- **Base del rediseño: propuesta D (Coral Editorial)** con tres detalles de A (microetiquetas mono, servicios numerados, tema oscuro opcional). Motivo: marca personal de servicios, mucho texto largo, logos pensados para fondo claro y continuidad con el azul actual.
- **Una sola rama para los docs**; la rama de código del rediseño nacerá de esta para poder fusionar los docs antes. Un merge a `master` publica en producción, así que el rediseño no se fusiona sin la aprobación de la clienta.
- **Sin cambios de versiones:** Gatsby 2.x, React 17 y plugins de la línea 2.x se mantienen. El rediseño será CSS plano con variables.
- **Auditoría como foto fija**; el seguimiento va en roadmap y changelog.
- **Los commits los hace el dueño del repo**; antes de cambiar código se confirma el alcance.

### Hallazgos / sorpresas
- El formulario de cotización pierde datos: `setOptionState` mal declarado (error real reproducido), título `undefined` y valores de prueba por defecto (A1).
- Con idioma regional del navegador (`en-US`, `es-VE`) el sitio muestra contenido mezclado y **0 testimonios** (A2).
- El HTML de producción **no tiene `<title>` ni metadatos SEO** aunque DatoCMS los entrega: falta `gatsby-plugin-react-helmet` (A3).
- Google Analytics se carga antes de cualquier consentimiento (A4).
- "Últimos posts" en la home muestra los **más antiguos** (M1).
- No hay `netlify.toml`, el lockfile está ignorado y el `.nvmrc` (`24.12.0`) no coincide con lo que se usa en local (M2). Los deploys actuales funcionan, así que no se toca el `.nvmrc` sin ver el log de Netlify.
- Falso positivo descartado: el `<head>` aparecía vacío en el dev server porque la pestaña de pruebas estaba oculta (`react-helmet` usa `requestAnimationFrame`). Por eso la evidencia de A3 es el HTML de producción.

### Pendiente y abierto
- Completar los `TODO(tú)` de [deploy-netlify.md](deploy-netlify.md): comando de build, Node del último deploy, alcance de `api_key`, webhook de DatoCMS, previews activos.
- Decisiones abiertas en el [roadmap](roadmap.md): boletín en el rediseño, textos comerciales del mock ("+6 años", "Respuesta en 24 h"), títulos de servicios, posts de prueba en el blog, modelo de consentimiento de cookies, si guardar las PNG de D y A en el repo.
- La clienta aún no ha respondido sobre las propuestas de arte.
- No se verificó: `gatsby build` completo, Node 24, el `<head>` en dev, envío real de formularios.

### Próximos pasos
1. Hacer commit de `docs/` (ver el mensaje sugerido en la conversación) y, si procede, abrir PR.
2. Ejecutar el prompt del rediseño (R0b) y revisar la muestra HTML contra los tokens y contrastes.
3. Crear la rama `feat/redesign-…` desde `docs/project-documentation` y empezar R1 (variables CSS, fuentes, header/footer) y R2 (home).
4. Decidir si A1/A2/M1 se arreglan dentro del rediseño o en ramas `fix/` aparte (por defecto: dentro, solo en archivos que se reescriben).

### Commits de la sesión
- `aa513b3` docs: add project docs, 2026-10 audit, roadmap and redesign plan
