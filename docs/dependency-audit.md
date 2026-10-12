# Auditoría de dependencias (`npm audit`)

Documento **vivo**: se actualiza cuando cambian las dependencias o se repite el análisis. Es el detalle del ítem **M8** del [roadmap](roadmap.md).

> El repositorio es público: aquí solo hay nombres de paquetes y avisos públicos de npm. Nada de claves ni de rutas locales.

## Estado (2026-10-12)

`npm install` informa de **337 vulnerabilidades** (14 low, 157 moderate, 155 high, 11 critical). Lo que hay detrás:

| Dato | Valor |
|---|---|
| Avisos únicos (advisories) | **140**: 7 críticos, 65 altos, 60 moderados, 8 bajos. Los 337 son esos mismos avisos repetidos por cada ruta del árbol en la que aparecen |
| Paquetes en el árbol | 2.727 |
| ¿El lock local infla la cifra? | **No.** Resolver el árbol desde cero (como hace Netlify, porque `package-lock.json` no está en git) da exactamente lo mismo: 337 |
| Acciones que propone `npm audit` | 5 **versiones mayores**, 2 actualizaciones menores, 28 "revisar a mano" (sin parche compatible) |

### De dónde vienen

Todo se reparte entre **7 de las 25 dependencias directas** (las demás no traen ninguno):

| Dependencia directa | Críticos | Altos | Moderados | Bajos | Arreglo que ofrece npm |
|---|---|---|---|---|---|
| `gatsby` | 4 | 54 | 44 | 7 | `gatsby@5` (mayor) |
| `gatsby-plugin-sharp` | 2 | 8 | 8 | 1 | `5.x` (mayor, exige Gatsby 5) |
| `gatsby-source-datocms` | 1 | 13 | 18 | 1 | ninguno compatible |
| `gatsby-transformer-remark` | 0 | 4 | 8 | 0 | `6.x` (mayor, exige Gatsby 5) |
| `gatsby-plugin-manifest` | 0 | 4 | 1 | 0 | ninguno compatible |
| `react-cookie-consent` | 0 | 1 | 0 | 0 | `10.x` (exige React ≥18 y Node ≥20.16) |
| `gatsby-plugin-gdpr-cookies` | 0 | 0 | 0 | 1 | `2.x` (mayor) |

(Un mismo aviso puede aparecer bajo varias dependencias; la tabla cuenta avisos únicos por raíz.)

## Qué llega al visitante y qué no

- **Herramientas de build (casi todo).** Dentro de `gatsby` los hallazgos están en `gatsby-cli`, `webpack-dev-server`, `eslint-plugin-graphql`, `react-dev-utils`, `axios` (del CLI), los loaders de CSS, `socket.io` (recarga en caliente), etc. Son programas de Node que corren **en tu equipo y en el contenedor de build de Netlify**; no forman parte del JS que se publica. `npm 6` los llama "producción" solo porque todo el `package.json` está en `dependencies` (`--production` no sirve para separar nada).
- **Código que sí viaja al navegador: 2 hallazgos.**
  - `js-cookie` 2.2.1 (alto, vía `react-cookie-consent`): el aviso exige que el objeto de atributos de `Cookies.set` salga de un `JSON.parse` de datos de un atacante. El banner (`src/components/layout.js`) solo le pasa opciones fijas y el código del sitio no hace `JSON.parse` de nada externo: **no es alcanzable con el uso actual** (conclusión por lectura del código, no se probó ningún exploit).
  - `cookie` 0.4.2 (bajo, vía `gatsby-plugin-gdpr-cookies`): exige valores no confiables como nombre, ruta o dominio de una cookie. Hoy el plugin no tiene `trackingId` y no hace nada.
- **Entrada del build.** El contenido que procesa el build viene de DatoCMS (del dueño) y del repositorio; no hay entrada de usuarios anónimos en el build.

## Por qué no se arregla ahora

- Cada arreglo real es una **versión mayor** (Gatsby 5, `gatsby-plugin-sharp` 5, `gatsby-transformer-remark` 6…) y rompe la regla de la línea Gatsby 2.x del [roadmap](roadmap.md): es la migración del apartado "Futuro", un proyecto aparte.
- `react-cookie-consent` solo corrige `js-cookie` en la 10.x, que no es compatible con React 17 ni con Node 14. Las versiones 7, 8 y 9 siguen con `js-cookie` 2.2.1.
- `npm audit fix` solo actualizaría `node-fetch` y `cross-fetch`, que resuelven 3 de las 337 rutas, y lo haría **solo en `node_modules` y en el lock local** (el lock no está en git): Netlify no lo recibiría.
- Todas las dependencias directas se usan: no hay nada que quitar para bajar la cifra.

## Qué no hacer

- **`npm audit fix --force`**: sube versiones mayores (Gatsby 5, React…) y rompería el sitio.
- Fijar versiones con `resolutions`/`overrides`: npm 6 no los soporta y el lock no se versiona.

## Qué sí se hace

1. **Retirar `react-cookie-consent`** cuando el rediseño sustituya el banner de cookies (A4 y R1: el banner nuevo ya guarda la cookie de consentimiento). Con eso desaparece el único aviso alto que llega al navegador. Si A4 termina sin usar `gatsby-plugin-gdpr-cookies`, retirarlo también.
2. **Migrar Gatsby 2 → versión soportada** (apartado "Futuro" del roadmap): es la única forma de bajar la cifra de verdad.
3. **Higiene del servidor de desarrollo:** `npm run develop` arranca con `-H 0.0.0.0`, que lo deja accesible desde la red local, y `webpack-dev-server`, `socket.io` y `webpack-dev-middleware` tienen avisos altos. Usarlo solo en redes de confianza o con `gatsby develop` (solo `localhost`) cuando no haga falta probar desde otro dispositivo.
4. **Repetir este análisis** al cerrar el rediseño y antes de cualquier migración.

## Qué exigiría migrar (verificado el 2026-10-12)

Datos del registro de npm y del README del plugin; sirven para decidir cuándo y cómo migrar. Decisión tomada: **no antes del rediseño**.

| Quiero | Exige |
|---|---|
| React 18 | Gatsby ≥ 4.13 (la 4.0.0 no lo admite, la 4.13.0 sí). Gatsby 2 solo admite React 16 y 17 |
| Gatsby 4 (último, 4.25.9) | Node ≥ 14.15 (sirve el Node 14 actual); React 16, 17 o 18 |
| Gatsby 5 (último, 5.16.1) | React ≥ 18 y **Node ≥ 18** (también en Netlify) |
| `gatsby-source-datocms` | 2.x: Gatsby 2 o 3 · 3.x y 4.x: Gatsby 2 a 4 · 5.x: Gatsby ≥ 4.24. El README fija: Gatsby 2 → `^2.6.17`; Gatsby 3 o 4 anterior a 4.24 → `^4.0.4` |
| `gatsby-plugin-image` | 1.x: Gatsby 3 · 2.x: Gatsby 4 · 3.x: Gatsby 5 |
| `gatsby-plugin-sharp` / `gatsby-transformer-remark` | mayor 5 / 6 para Gatsby 5 (Node ≥ 18) |

- **DatoCMS (el CMS) no se rompe**: es contenido y API. Lo que cambia es el plugin.
- **El plugin está en modo mantenimiento y su repositorio archivado desde junio 2024** (README: "due to upstream changes at Gatsby and Netlify"); para proyectos nuevos recomienda otra vía (la API GraphQL de DatoCMS directamente). Gatsby 5 es un destino con poco recorrido.
- **Imágenes:** el README sigue documentando `fluid`/`fixed` (`gatsby-image`) como obsoletas pero disponibles, así que migrar a `gatsby-plugin-image` no sería obligatorio de golpe (no verificado para la 5.x). Tamaño actual: 17 archivos importan `gatsby-image`, 50 fragmentos `GatsbyDatoCmsFluid` en 15 archivos, 26 `<Img>`. El SEO (`HelmetDatoCms`, 10 usos) no cambia.
- **Sin verificar:** qué cambia en el esquema de GraphQL entre el plugin 2.x y el 5.x (no hay guía de migración); `gatsby-plugin-scroll-reveal` 0.0.7 y `gatsby-plugin-gdpr-cookies` con Gatsby 4/5.
- **Camino de menor riesgo si se migra dentro de Gatsby:** Gatsby 4.25.9 (mantiene Node 14 y React 17/18) como escalón, con el plugin 5.x; la ganancia en vulnerabilidades es pequeña. La alternativa es cambiar de framework con la API GraphQL de DatoCMS.

## Cómo reproducirlo

Con Node 14.21.3 y npm 6.14.18, desde la raíz del proyecto:

```powershell
npm audit --json > audit.json
```

Para ver lo que vería Netlify (sin lock), en una carpeta aparte con solo una copia de `package.json`:

```powershell
npm install --package-lock-only --ignore-scripts --no-audit
npm audit --json
```

El análisis agrupa `advisories[*].findings[*].paths` por su primer segmento (la dependencia directa).

## Límites de este análisis

- **npm 6 usa un endpoint de auditoría que npm ha anunciado que retira** (el propio `npm audit` lo avisa). Si deja de responder, hay que auditar con un npm más nuevo solo para eso (`npx npm@9 audit` sobre el mismo `package.json`; npm 9 declara soporte para Node 14.17+, no se ha probado aquí).
- La separación "build / navegador" se hizo por la ruta de cada hallazgo y por el conocimiento de qué hace cada herramienta; no se midió qué módulos entran en el JS final.
- "No alcanzable" es una lectura del código propio y de la descripción pública de cada aviso, no una prueba de explotación.
