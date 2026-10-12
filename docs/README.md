# Documentación de NaNSYSTEMS

Documentación interna del sitio nansystems.us (Gatsby 2 + DatoCMS, publicado en Netlify).
Esta carpeta **no se publica en el sitio web**: vive solo en el repositorio.

> El repositorio de GitHub es **público**, así que todo lo que se escriba aquí es legible por cualquiera.
> Reglas: nada de tokens, claves, valores de `.env`, correos personales ni rutas locales con nombres de usuario.

## Índice

| Archivo | Para qué sirve | Tipo |
|---|---|---|
| [setup-local.md](setup-local.md) | Levantar el proyecto en local (Node 14, `.env`, comandos) | Guía |
| [architecture.md](architecture.md) | Cómo está armado el sitio y qué código está en uso | Referencia |
| [deploy-netlify.md](deploy-netlify.md) | Cómo se publica, variables, límites del plan, previews | Referencia |
| [workflow.md](workflow.md) | Cómo se trabaja un cambio de principio a fin | Guía |
| [audit-2026-10.md](audit-2026-10.md) | Auditoría del 2026-10-10 con evidencia | **Foto fija** (no se edita) |
| [roadmap.md](roadmap.md) | Mejoras pendientes con estado | **Vivo** |
| [redesign.md](redesign.md) | Decisión, tokens y plan del rediseño | **Vivo** |
| [CHANGELOG.md](CHANGELOG.md) | Registro de cambios realizados | **Vivo** |
| [dev-log.md](dev-log.md) | Bitácora de cada sesión: hecho, decisiones, pendiente y próximos pasos | **Vivo** |

## Estado actual (2026-10-12)

- Stack instalado: Gatsby 2.32.13, React 17.0.2, gatsby-source-datocms 2.6.18, sharp 0.27.2.
- Node para desarrollo local: **14.21.3** (npm 6.14.18).
- Producción: Netlify (plan Free, legacy), build desde la rama `master` de GitHub.
- Los módulos de contenido (blog, proyectos, biografía, etc.) viven en DatoCMS.
- Hay una auditoría completa y un plan por fases; ver [roadmap.md](roadmap.md).
- Rediseño elegido como base: propuesta D (Coral Editorial); ver [redesign.md](redesign.md).
- Muestras HTML de todas las pantallas y su SPEC: hechas y revisadas (fuera del repo). Siguiente: pieza vertical R1a en una rama aparte.
- Arreglos de código hechos en la rama `fix/portfolio-total-refactor-design-2026` (aún **no** en `master`): A6, A1, A2, M1, A5, A7, M3, M5 y A3 (SEO en el HTML estático; faltan sitemap y `robots.txt`). Pendiente: esa decisión, PR del hito 1 y R1a. Ver [roadmap.md](roadmap.md) y [dev-log.md](dev-log.md).

## Convenciones

- Documentación en español; nombres de código, rutas y comandos tal cual están en inglés.
- Los hallazgos de la auditoría tienen ID (`A1`, `M2`, `B3`…). El roadmap, el changelog y los commits los usan para enlazar.
- Las referencias `archivo:línea` de la auditoría corresponden al commit `d3a5b12`; cambian en cuanto se toque el código.
- Un `TODO(tú)` marca información que solo se ve en un panel externo (Netlify, DatoCMS, EmailJS) y que no se ha podido comprobar desde el repo.
- Los commits los hace el dueño del repo; antes de cambiar código se confirma el alcance.
