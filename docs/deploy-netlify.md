# Despliegue en Netlify

## Cadena de publicación

```
GitHub (rama master)  →  Netlify build  →  nansystems.us
```

- Producción la sirve Netlify (cabecera `Server: Netlify`) y está construida con Gatsby 2.32.13.
- **Un merge a `master` es un deploy a producción.** Subir otras ramas no construye nada por defecto.
- Los deploys recientes funcionan: `/forms.html`, añadido el 2026-01-07, está publicado (comprobado el 2026-10-10).

## Configuración

El repo **no tiene `netlify.toml`, `static/_headers` ni `static/_redirects`**: la configuración vive en el panel de Netlify, fuera de git (hallazgo M2).

| Dato | Valor | Estado |
|---|---|---|
| Comando de build | probablemente `gatsby build` | `TODO(tú)` confirmar en Site configuration → Build & deploy |
| Directorio de publicación | probablemente `public` | `TODO(tú)` confirmar |
| Variable `api_key` | token de solo lectura de DatoCMS | Existe (el build funciona). `TODO(tú)` confirmar a qué contextos aplica: Production / Deploy Previews / Branch deploys |
| Versión de Node | **desconocida** | `TODO(tú)`: ver las primeras líneas del log del último deploy |
| Webhook de DatoCMS | un commit de 2021 menciona "fire builds from netlify" | `TODO(tú)` confirmar si sigue activo (cada edición de contenido lanza un build y gasta cuota) |
| Deploy previews / branch deploys | por defecto: previews activos al abrir un PR, branch deploys apagados | `TODO(tú)` confirmar en Project configuration → Developer settings → Continuous deployment |

### Sobre la versión de Node

- `.nvmrc` dice `24.12.0`; el mensaje del commit que lo añadió (`ff4e719`) decía "node 22"; en local se usa 14.21.3.
- No se sabe qué versión usa realmente Netlify (puede mandar una variable `NODE_VERSION` del panel o el `.nvmrc`).
- **No cambies el `.nvmrc` sin mirar antes el log del deploy**: Netlify lo lee, y los deploys hoy funcionan.

## Plan y límites

Plan **Free (legacy)**. Datos del panel el 2026-10-10:

| Recurso | Límite | Uso observado |
|---|---|---|
| Minutos de build | 300 / mes (límite duro) | 1 |
| Ancho de banda | 100 GB / mes (límite duro) | 837 MB |
| Builds concurrentes | 1 | — |
| Envíos de formularios | 100 por sitio y mes (según la tabla de planes legacy) | `TODO(tú)` |

- El contador se reinicia el primer día de cada mes.
- Free **no genera cargos**: "Legacy Free tier accounts are not charged, but have metered limits".
- Al llegar al límite de builds, el sitio sigue sirviéndose pero se desactivan los builds nuevos de **todos los sitios de la cuenta**. En otros límites al 100% el sitio se pausa hasta pasar a un plan de pago. Netlify avisa al 50 %, 75 %, 90 % y 100 %.
- **No cambies a un plan por créditos**: el cambio es permanente y no se puede revertir. En el plan por créditos, los previews no consumen créditos y cada deploy a producción cuesta 15 (de 300 al mes), pero no es el plan actual.
- Dato no verificado explícitamente en la documentación: en legacy, los minutos de build de los deploy previews cuentan dentro de los 300. Tratar como cierto al planificar.

## Qué consume cuota

- Cada build de producción (merge a `master`, publicación en DatoCMS si el webhook sigue activo, builds manuales).
- Cada build de un deploy preview (se crea al abrir un PR; cada push posterior al PR vuelve a construir).
- Push a una rama sin PR: **no** construye (branch deploys apagados).

## Control de builds

- Desactivar o reactivar los deploy previews: Project configuration → Developer settings → Continuous deployment → Branches and deploy contexts → Configure.
- Detener todos los builds (producción, previews y branch deploys): mismo menú → Build settings → Build status → Stopped builds.
- Saltar un build individual con un mensaje de commit (`[skip ci]` / `[skip netlify]`) o con `build.ignore`: **no confirmado** en la documentación consultada; ver la página "Ignore builds" de Netlify antes de usarlo.

## Formularios de Netlify

- Formulario `newsletter`: registrado en el build por `static/forms.html`; el componente `mailChimpForm.js` envía un POST a `/`.
- Los envíos se leen en el panel de Netlify → Forms.
- Límite legacy Free: 100 envíos por sitio y mes.

## Estado de cabeceras y archivos SEO (2026-10-10)

- Cabeceras observadas en la home: `Strict-Transport-Security` y `Cache-Control`. Sin CSP, `X-Frame-Options`, `Referrer-Policy` ni `X-Content-Type-Options` (hallazgo M7).
- `/robots.txt` y `/sitemap.xml` devuelven 404 (hallazgo A3).

## Referencias oficiales

- Credit-based pricing plans: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
- Legacy pricing plans: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-legacy-plans/legacy-pricing-plans/
- Billing FAQ for legacy plans: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-legacy-plans/billing-faq-for-legacy-plans/
- Deploy previews: https://docs.netlify.com/deploy/deploy-types/deploy-previews/
- Stop or activate builds: https://docs.netlify.com/build/configure-builds/stop-or-activate-builds/
