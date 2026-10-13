# Scripts de DatoCMS

Herramientas para cargar y respaldar contenido con la API de gestión (CMA). Contexto, límites y tokens: [docs/datocms-api.md](../../docs/datocms-api.md). El contenido que se carga está en [docs/contenido-nansystems.md](../../docs/contenido-nansystems.md).

## Reglas

- **Simulacro por defecto.** Ningún script escribe sin `--apply` (o sin `--yes` en `env.js`).
- **Nunca se escribe en `main`.** El contenido se carga en un entorno de pruebas (una copia de `main`) y se promueve cuando esté aprobado.
- **Tokens:** `api_key` del `.env` (solo lectura) y `DATOCMS_WRITE_TOKEN` de `datocms-write.env` (escritura). Los dos archivos están en `.gitignore`. **Crear o usar entornos de prueba exige el "Full-access API token" (rol Admin)**: el rol Editor responde `401 INSUFFICIENT_PERMISSIONS` (comprobado el 2026-10-13). Pon ese token en `datocms-write.env` solo mientras dure la carga y regénéralo después. Todo lo que se imprime pasa por un filtro que oculta los tokens.
- Compatible con Node 14 y sin dependencias.
- Límite de la API: 60 peticiones cada 3 s; el cliente las espacía y reintenta ante un 429.

## Flujo

1. **Respaldo** (solo lectura, fuera del repositorio porque incluye sueldos y correos):

   ```bash
   node tools/datocms/backup.js --out "C:\ruta\fuera\del\repo\backup-datocms-AAAA-MM-DD"
   ```

2. **Entorno de pruebas** (copia de `main`; no toca producción):

   ```bash
   node tools/datocms/env.js fork contenido-2026-10
   node tools/datocms/env.js list
   ```

3. **Imágenes del kit** (alt ES/EN y punto focal salen de la tabla del `LEEME.md` del kit):

   ```bash
   node tools/datocms/upload-kit.js --dir "C:\...\imagenes-para-datocms" --env contenido-2026-10 --files blog-eficiencia-energetica.jpg,servicio-automatizacion-edificios.jpg,servicio-infraestructura-it.jpg,servicio-diseno-cad.jpg,tarjeta-conservacion-energia.jpg,proyectos-edificio.jpg
   ```

   Añade `--apply` para subirlas (sin él solo lista lo que haría).

4. **Contenido**: primero el simulacro, que enseña cada diferencia, y luego la carga:

   ```bash
   node tools/datocms/load-content.js --env contenido-2026-10
   node tools/datocms/load-content.js --env contenido-2026-10 --apply
   ```

   Al terminar repite la comparación: debe decir "sin cambios pendientes". Se puede limitar con `--only` (`venture`, `aboutnew`, `about`, `technology`, `work`, `certs`, `testimony`, `seo`, `blog`).

5. **Leer el sitio con ese contenido** en local: en `.env` añade `DATO_ENVIRONMENT=contenido-2026-10` y ejecuta `npm run develop` (o `npm run build`). `gatsby-config.js` pasa esa variable al plugin. Para el Deploy Preview, define la misma variable en Netlify solo para el contexto "Deploy Previews".

6. **Aprobado el contenido:** `node tools/datocms/env.js promote contenido-2026-10 --yes` convierte la copia en el entorno principal (**publica**) y hay que relanzar el despliegue de producción. Mientras tanto, nadie debe editar `main`: lo que se cambie allí se perdería al promover.

7. **Limpieza:** `node tools/datocms/env.js delete contenido-2026-10 --yes` cuando ya no haga falta.

## Archivos

| Archivo | Para qué |
|---|---|
| `lib.js` | Cliente de la API, filtro de tokens, límite de peticiones |
| `env.js` | Listar, copiar, promover y borrar entornos |
| `backup.js` | Respaldo JSON de modelos, campos, registros (con bloques anidados) y mediateca |
| `upload-kit.js` | Sube las imágenes del kit con alt y punto focal |
| `load-content.js` | Convierte el documento de contenido en cambios sobre los registros |
| `.state/` | Identificadores de las imágenes subidas por entorno (ignorada por Git) |

## Qué hace `load-content.js`

Cuatro servicios en `technology` (tres registros se reutilizan y uno es nuevo), la bienvenida y las tres áreas de "Sobre nosotros" con misión, visión y valores, la biografía de Ana, los siete puestos del portafolio (cinco existentes, uno reutilizado y uno nuevo; borra cinco que quedan en el respaldo), las diez certificaciones (una nueva), los tres testimonios, el SEO de seis páginas y de cada servicio, y el blog (despublica las cinco pruebas y crea dos artículos que publica solo en el entorno de pruebas). Los campos obligatorios que la web no muestra (sueldo, opinión, fecha de LEED) se rellenan con valores neutros.
