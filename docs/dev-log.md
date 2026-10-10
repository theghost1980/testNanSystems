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
- Pendiente: el dueño del repo hace el commit de `docs/` (rellenar el hash aquí).
