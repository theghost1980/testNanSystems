# DatoCMS: qué se puede hacer desde el repositorio (API de gestión)

**Estado:** verificado el 2026-10-12 con la documentación oficial de DatoCMS y con consultas **de solo lectura** al proyecto (no se escribió nada). Este documento no contiene valores de tokens ni debe contenerlos (el repositorio es público).

Fuentes: [Content Management API](https://www.datocms.com/docs/content-management-api), [autenticación](https://www.datocms.com/docs/content-management-api/authentication), [límites técnicos](https://www.datocms.com/docs/content-management-api/technical-limits), [crear registro](https://www.datocms.com/docs/content-management-api/resources/item/create), [crear archivo](https://www.datocms.com/docs/content-management-api/resources/upload/create), [disparadores de build](https://www.datocms.com/docs/content-management-api/resources/build-trigger), [entornos](https://www.datocms.com/docs/general-concepts/environments).

## 1. Las dos APIs

| | Entrega (CDA) | Gestión (CMA) |
|---|---|---|
| Dirección | `graphql.datocms.com` (GraphQL) | `site-api.datocms.com` (REST, JSON:API; cabecera `X-Api-Version: 3`) |
| Para qué | leer contenido publicado | leer **y escribir** todo: registros, archivos, esquema, entornos, disparadores de build |
| Quién la usa hoy | las pruebas de datos de la sesión | el plugin `gatsby-source-datocms` 2.x al compilar (lectura) |

Límite de la CMA: **60 peticiones cada 3 segundos** (responde `429` con `x-ratelimit-reset`); registro de hasta **300 KB**; archivos de hasta **1 GB**. En los planes gratuitos, al pasar la cuota mensual de la API las respuestas se desactivan hasta el mes siguiente.

## 2. Tokens del proyecto (hallazgo de seguridad, M10)

El proyecto (`nansystems`) tiene **dos tokens**, ambos con acceso a las dos APIs y sin roles personalizados:

| Token | Tipo | Puede |
|---|---|---|
| "Full-access API token" | `admin` | **todo**: leer y escribir contenido, cambiar el esquema, gestionar tokens, entornos y disparadores |
| "Read-only API token" | `readonly` | leer (CDA y CMA) |

**El token que hay en el `.env` (`api_key`) es el de acceso completo, no el de solo lectura.** Es el mismo nombre que usa Netlify (`api_key`), así que casi seguro el build de Netlify también lo usa (no se pudo comprobar desde aquí: revisar en Netlify → Site settings → Environment variables). Consecuencias:

- Cualquiera que vea esa variable (registro de un build, un Deploy Preview de un PR, una copia del `.env`, una conversación) puede **borrar o cambiar todo el contenido y el esquema**.
- **Comprobado:** el sitio compila igual con el token de solo lectura (20 páginas, 1152 nodos), así que el build **no necesita** poderes de escritura.
- La consulta de `access_tokens` **devuelve los valores completos**: solo la puede hacer un token con permiso de gestionar tokens (el de acceso completo). Comprobado después del cambio: el token de solo lectura recibe `401` al intentarlo. Los scripts no deben listarlos; los de esta carpeta de trabajo filtran cualquier cadena con forma de token antes de imprimir.

Recomendación (pendiente del dueño):

1. Poner el **Read-only API token** en `api_key` (el `.env` y Netlify, incluidos los Deploy Previews).
2. **Regenerar el Full-access token** (DatoCMS → Project Settings → API tokens): su valor apareció en la salida de una consulta durante la sesión de trabajo del 2026-10-12 (queda en el registro local de esa sesión).
3. **Estado verificado el 2026-10-12 tras el cambio:** `api_key` del `.env` = token de solo lectura (lee todo, `401` al listar tokens); `datocms-write.env` (ignorado por Git) = token de escritura que **no** puede listar tokens ni webhooks, es decir, se comporta como el rol Editor (no es de acceso completo). Falta comprobar el valor de `api_key` en **Netlify** (no se ve desde aquí).
4. Para escribir contenido desde el repositorio, usar un **token aparte con un rol acotado** (crear/editar/publicar registros y subir archivos; sin esquema, sin tokens, sin usuarios), guardarlo **solo en el equipo local** en otra variable (por ejemplo `DATOCMS_WRITE_TOKEN`, fuera de Git y de Netlify) y borrarlo o regenerarlo cuando ya no haga falta.

## 3. Lo que hay en el CMS

27 modelos y 108 archivos en la mediateca. Un solo entorno (`main`). **Solo `blog_post` tiene modo borrador** (lo activó el dueño el 2026-10-12; los 5 artículos de prueba siguen publicados); en el resto de modelos lo que se guarda queda publicado al instante. Todos exigen **todos los idiomas** (`es` y `en`).

- **`blog_post`** (5 registros): `title`\*, `content`\* (Markdown), `categories`\* (texto separado por comas), `date_published`\* (fecha y hora) — los cuatro **por idioma**; `slug`\* (único, común), `cover_image`\* (archivo, común), `seo_settings`, `kat` (bloques; sin uso).
- **`technology`** (3): igual que un artículo más `short_title`\* y `short_description`\*.
- **Singletons de páginas:** `info_site`, `aboutnew`, `venture`, `about`, `about_company` y los `seo_*` de blog, contacto, portafolio y proyectos.
- **Otros:** `work_experience` (11), `item` (14, ítems de proyectos y biografía), `itemsabout` (6), `credit` (13), `testimony` (3), `social_profile` (3), `item_carousel` (16, sin uso en el rediseño), `newsletter` (2) y otros vacíos (`category`, `cert`, `advisors_partner`…).
- **Disparador de build:** uno, "Blog Posts" (Netlify, activo). No hay webhooks.

(\* = obligatorio.)

### Estado del contenido (auditoría de solo lectura, 2026-10-12)

- **Mediateca:** 108 imágenes, **todas sin texto alternativo y sin punto focal** (67 PNG, 29 JPG, 9 JPEG, 2 WebP y 1 SVG; la más pesada, 1,3 MB).
- **Texto de relleno:** 66 campos (en español e inglés): contenido de artículos de prueba (`blog_post.content`), `work_experience.summary_tasks` y `accomplishments`, `item.shot_title` y `item.content`, y el modelo viejo `about_company`. Textos largos **idénticos en ambos idiomas** (posible falta de traducción): 14, casi todos relleno.
- **Artículos del blog:** los 5 que hay son **de prueba** ("Probando el disparo automático", "Testing the automatic Build on Netflify", "Triggering a Deploy on Netlify", "Prueba de MD + Imágenes"…, de 2020 y 2021) y salen en el blog y en la home del rediseño: hay que sustituirlos por artículos reales antes de publicar.

## 4. Qué se puede hacer (con un token de escritura)

- **Crear, editar, borrar y publicar registros**, uno a uno o en lote: artículos, servicios, experiencias, créditos, textos de las páginas.
- **Subir imágenes** desde un archivo local o una URL, con **texto alternativo por idioma, punto focal, autor y etiquetas**; y **corregir el alt y el punto focal de los 108 archivos existentes** (hoy casi todos están vacíos). Es la forma de aplicar el kit de imágenes del rediseño.
- **Completar o limpiar el contenido de relleno** (los "Lorem ipsum" de biografía, proyectos y portafolio) cuando la clienta entregue los textos.
- **Cambiar el esquema** (añadir campos, por ejemplo un correo de contacto en `info_site`, o activar el modo borrador), sin tocar el panel.
- **Auditar el contenido** con informes: imágenes sin alt, textos de relleno, traducciones vacías o idénticas.
- **Disparar el despliegue** en Netlify (`build-triggers/<id>/trigger`) cuando termine una tanda de cambios.
- **Probar en un sandbox:** las peticiones llevan la cabecera `X-Environment: <nombre>` (o la opción `environment` del cliente) y el plugin de Gatsby puede apuntar a ese entorno. Crear (`fork`) y promover entornos también va por la API; **no se probó** (crea datos) y puede depender del plan.
- **Programar publicaciones** (solo en modelos con borrador) y consultar versiones de un registro.
- **Preparar el artículo completo** (texto en los dos idiomas, categorías, fecha, slug, portada subida y alt) y **dejarlo en un sandbox o en borrador para que la clienta lo revise antes de publicar**.

## 5. Lo que no se puede (o no se debe)

- **Nada se ve en el sitio hasta el siguiente build:** el sitio es estático; publicar en el CMS no cambia nada sin un build (cada build gasta minutos de los 300 mensuales de Netlify). `gatsby develop` sí lee el contenido en vivo.
- **Sin modo borrador, un registro creado queda publicado en el CMS en el acto** y saldrá en el próximo build. Por eso, antes de escribir: activar el borrador en el modelo o trabajar en un sandbox.
- **Borrar es destructivo** y los cambios de esquema (renombrar o quitar un campo) **rompen las consultas GraphQL del sitio**: se coordinan con el código y se piden confirmación y copia previa.
- **No se escribe contenido "de la clienta" por su cuenta:** los artículos y textos de negocio (cifras, clientes, promesas) los aporta o aprueba ella. Se pueden redactar borradores, nunca publicarlos sin su visto bueno.
- **No se generan imágenes** (las crea el dueño con Gemini): sí se suben y se describen.
- **Los tokens no se guardan en el repositorio, en la documentación ni en Netlify** salvo el de solo lectura del build. Hoy no hay token de escritura acotado; mientras se use el de acceso completo, cualquier script tiene poder de borrar todo.
- **Límites del plan:** `subscription-limits` responde que el proyecto no está en el modelo de precios por proyecto (plan antiguo), así que no se pudieron leer cuotas ni límites de entornos; antes de depender de un sandbox o de volumen de API, comprobarlo en el panel (Billing).
- **El plugin de Gatsby 2** (`gatsby-source-datocms` 2.x) está en mantenimiento y archivado: sirve para lo que hace hoy, no para funciones nuevas del CMS.

## 6. Cómo se trabajaría

1. Dueño: poner el token de solo lectura en `api_key` y crear el token de escritura acotado (sección 2).
2. Los scripts de contenido viven **fuera del código del sitio** (por ejemplo una carpeta `tools/` con su propio `package.json`), porque el cliente oficial (`@datocms/cma-client-node`, v6) no declara versión mínima de Node y el proyecto está en Node 14. Con Node 14 se puede hablar con la REST directamente con `https` (así se hicieron las lecturas de esta sesión).
3. Cada script: modo **simulacro** por defecto (muestra lo que haría), escritura solo con un indicador explícito, un registro de lo cambiado y respeto del límite de 60 peticiones cada 3 segundos.
4. Revisión del dueño o de la clienta del resultado en un sandbox o en borrador y, solo entonces, publicación y disparo del build.

## 7. Plan de trabajo para la próxima sesión (Fase 5 del roadmap, C1–C8)

Orden propuesto, de menor a mayor riesgo; cada paso termina con la aprobación del dueño antes de pasar al siguiente:

1. **C1 · Herramientas.** Carpeta `tools/` con un módulo común (lee `datocms-write.env`, filtra tokens en toda salida, limita el ritmo, guarda un registro de lo anterior en una carpeta ignorada por Git) y simulacro por defecto.
2. **C2 · Alt y punto focal de las 108 imágenes.** Las veo en lotes, escribo una propuesta (alt en español e inglés; punto focal solo donde recorta: portadas, tarjetas, hero) en un archivo para revisar y, con el visto bueno, la aplico por lote.
3. **C3 · Kit de imágenes del rediseño.** Subir las 12 imágenes (carpeta del paquete `imagenes-para-datocms`, con su `LEEME.md`) con alt y punto focal, y asignarlas a los campos de portada de servicios, tarjetas de biografía y proyectos y portadas de blog. Se guardan los identificadores de las imágenes anteriores.
4. **C4 · Relleno.** Vaciar los 66 campos de relleno (no se escribe texto inventado) y cargar los textos reales cuando la clienta los entregue; erratas solo con su visto bueno.
5. **C5 · Blog.** Despublicar los 5 artículos de prueba (con el borrador activo no se borran) y crear los reales como **borrador**; los publica el dueño. Cada artículo necesita: título, contenido en Markdown, categorías y fecha en los dos idiomas, un `slug` único y la portada subida (con alt y punto focal).
6. **C6 · Créditos.** Quitar "emailjs.com" de la lista.
7. **Cierre.** Disparar el build (botón de despliegue del panel; el rol Editor probablemente no puede hacerlo por la API) y repasar el sitio.

Pendientes que bloquean: que la clienta aporte textos y artículos (C4, C5), y que el dueño confirme el `api_key` de Netlify (M10).
