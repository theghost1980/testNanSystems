# Flujo de trabajo

## Ramas

| Rama | Uso |
|---|---|
| `master` | Producción. **Un merge aquí publica el sitio.** |
| `docs/<tema>` | Solo documentación |
| `fix/<tema>` | Corrección de bugs (ver [roadmap.md](roadmap.md)) |
| `feat/<tema>` | Mejoras y rediseño |

- Una rama que solo cambia `docs/` es segura de fusionar: Gatsby ignora esa carpeta.
- Las ramas de código que dependen de la aprobación de la clienta (por ejemplo el rediseño) **no se fusionan a `master` hasta que apruebe**.
- Si una rama de código nace de otra rama de docs, los docs pueden fusionarse primero sin arrastrar el código.

## Ciclo de un cambio

1. Crear la rama (`git switch -c tipo/nombre`).
2. Hacer un cambio pequeño y acotado.
3. Verificar en local con `npm run develop` (ver [setup-local.md](setup-local.md)).
4. Verificar el build real: parar `develop`, `npm run build`, `npx gatsby serve`.
5. Actualizar [CHANGELOG.md](CHANGELOG.md) y el estado en [roadmap.md](roadmap.md).
6. Hacer commit y push (los commits los hace el dueño del repo).
7. Abrir PR. Si los previews están activos, Netlify construye un deploy preview; revisarlo en ES y EN y en móvil.
8. Fusionar a `master` solo cuando todo esté verificado.
9. Comprobar producción tras el deploy (la página afectada, ambos idiomas).

## Commits

Estilo histórico del repo: prefijo corto + mensaje claro, en minúsculas.

- `fix:` corrección de bug · `upg:` mejora · `docs:` documentación
- Mencionar el ID del roadmap cuando exista: `fix: A1 select de cotización`.

## Lista de verificación antes de fusionar

- [ ] `npm run build` termina sin errores con Node 14.
- [ ] La consola del navegador no muestra errores nuevos.
- [ ] Probado con `localStorage.i18nextLng` en `es`, `es-VE` y `en-US` (ver [setup-local.md](setup-local.md)).
- [ ] Móvil (375 px) y escritorio.
- [ ] Si se tocó un formulario: probado **sin enviar correos reales** o avisando antes.
- [ ] Si se tocó SEO: `public/index.html` tiene `<title>` y metadatos tras el build.
- [ ] `package.json` no cambió de versiones mayores.
- [ ] `CHANGELOG.md` y `roadmap.md` actualizados.

## Qué no tocar sin pensarlo

- Versiones mayores de Gatsby, React o de los plugins de Gatsby 2.
- El nombre de la variable `api_key`.
- El `.nvmrc` (lo lee Netlify) hasta confirmar qué Node usa el build.
- Rutas públicas sin añadir su redirect.
- El formulario `newsletter` y `static/forms.html` (deben coincidir).
- La documentación **no va** en `static/` ni en `src/pages/`: lo que está ahí se publica.

## Acuerdos de trabajo con Claude Code

- No hace commits: los hace el dueño del repo.
- Pregunta antes de cambiar archivos de código o de configuración.
- Los textos de esta carpeta no llevan secretos (el repo es público).
