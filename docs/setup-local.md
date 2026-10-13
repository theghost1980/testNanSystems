# Levantar el proyecto en local

Probado en Windows 11 con nvm-windows 1.2.2 y PowerShell.

## 1. Requisitos

| Herramienta | Versión | Notas |
|---|---|---|
| Node.js | **14.21.3** | npm 6.14.18 incluido |
| nvm-windows | 1.2.2 | Para cambiar de versión de Node |
| Token de DatoCMS | solo lectura | Sin él el build falla (ver paso 3) |

**¿Por qué Node 14?** Gatsby 2 es de 2020 y sus dependencias nativas (por ejemplo `sharp` 0.27) no están pensadas para Node moderno. En local no se ha probado con Node 24. El `.nvmrc` del repo dice `24.12.0`, pero eso afecta a lo que decida usar Netlify, no a esta guía; ver [deploy-netlify.md](deploy-netlify.md).

## 2. Instalar Node 14.21.3

Intento normal:

```powershell
nvm install 14.21.3
nvm use 14.21.3
node -v
npm -v
```

Debe mostrar `v14.21.3` y `6.14.18`. Si `nvm use` da error de permisos, abre PowerShell como administrador (nvm-windows crea un enlace simbólico).

### Si `nvm install` falla con "npm-v6.14.18.zip: The system cannot find the file specified"

Es un fallo de nvm-windows 1.2.2: descarga npm en una carpeta temporal y lo busca en otra distinta; la instalación se revierte y no queda la carpeta de la versión. Instalación manual:

1. Descarga `node-v14.21.3-win-x64.zip` desde `https://nodejs.org/dist/v14.21.3/`.
2. Comprueba su SHA-256 contra `https://nodejs.org/dist/v14.21.3/SHASUMS256.txt`. El valor publicado (comprobado el 2026-10-10) es:
   `47cfb919bb86ab681369636a9cb925e2bd61991aad1638b2e38e61ec956796a6`

   ```powershell
   (Get-FileHash "$env:TEMP\node-v14.21.3-win-x64.zip" -Algorithm SHA256).Hash
   ```
3. Descomprime y mueve la carpeta a la raíz de nvm con el nombre que nvm espera:

   ```powershell
   Expand-Archive -Path "$env:TEMP\node-v14.21.3-win-x64.zip" -DestinationPath "$env:TEMP\node14-extract"
   Move-Item "$env:TEMP\node14-extract\node-v14.21.3-win-x64" "$env:LOCALAPPDATA\nvm\v14.21.3"
   nvm use 14.21.3
   ```
4. Limpia temporales: `$env:TEMP\node14-extract`, el zip, y las carpetas `nvm-install-*` y `nvm-npm-*` de `$env:TEMP`.

La estructura correcta de la carpeta (`node.exe`, `npm.cmd`, `npx.cmd`, `node_modules\npm`) es igual a la de las otras versiones instaladas con nvm.

## 3. Variable de entorno `api_key`

Crea un archivo `.env` en la raíz del proyecto (no se sube a git: lo ignora la regla `*.env`):

```
api_key=<token de solo lectura de DatoCMS>
```

- El nombre es **`api_key` en minúsculas** (se lee en `gatsby-config.js`). No lo renombres: Netlify usa el mismo nombre.
- Usa el **"Read-only API token"** de DatoCMS → Project Settings → API tokens: basta para compilar el sitio. **No pongas aquí el token de acceso completo** (M10): quien vea esa variable podría cambiar o borrar todo el contenido.
- Opcional: `GATSBY_CONTACT_EMAIL=<correo>` en el mismo `.env`. Es el correo que aparece en el mensaje de error de los formularios de contacto y cotización; sin ella el mensaje sale sin dirección. Se fija al arrancar o construir: reinicia `develop` si la cambias. En Netlify se define igual, en las variables de entorno del sitio.
- Los formularios (contacto, cotización y boletín) **no se pueden probar en local**: el dev server responde 404 al POST. Se prueban en un deploy preview.
- Opcional: `DATO_ENVIRONMENT=<entorno>` en el mismo `.env` para leer de un **entorno de pruebas** de DatoCMS en lugar de `main` (el que usa producción). Sin ella se lee `main`. Ver [tools/datocms/README.md](../tools/datocms/README.md).
- Si falta `api_key` (o está vacía), `develop`, `build` y `serve` se detienen enseguida con `ERROR #10123 CONFIG` y un mensaje que nombra la variable (antes se enviaba el texto `"undefined"` a DatoCMS y el error era un `401` poco claro).

## 4. Instalar y arrancar

```powershell
npm install
npm run develop
```

- Sitio: http://localhost:8000
- Explorador GraphQL: http://localhost:8000/___graphql
- `npm install` genera `package-lock.json`; está ignorado por `.gitignore` y no ensucia git.
- Si `npm install` se queja de peer dependencies, prueba `npm install --legacy-peer-deps`.
- `npm run develop` usa `-H 0.0.0.0`: el servidor también queda accesible desde tu red local.

## 5. Build de producción en local

Detén antes `npm run develop` (ambos comparten `.cache`).

```powershell
npm run build
npx gatsby serve
```

`gatsby serve` publica el resultado en http://localhost:9000. Útil para comprobar el HTML estático generado (por ejemplo, que `public/index.html` tenga `<title>` y metadatos; ver hallazgo A3 de la auditoría).

## 6. Probar los dos idiomas

El idioma se guarda en `localStorage.i18nextLng`. En la consola del navegador:

```js
localStorage.setItem('i18nextLng', 'es-VE'); location.reload()   // español regional
localStorage.setItem('i18nextLng', 'en-US'); location.reload()   // inglés regional
localStorage.setItem('i18nextLng', 'es');    location.reload()   // el caso "limpio"
```

Probar los tres es importante: hoy el sitio se comporta distinto con códigos regionales (hallazgo A2).

## 7. Avisos

- **Los formularios de contacto y de cotización envían correos reales** (las credenciales de EmailJS están en el código). No los uses para probar sin avisar.
- Los formularios de Netlify (boletín) **no funcionan en local**, solo desplegados.
- En `master` (sitio actual) una build de producción (`gatsby build` + `gatsby serve`) carga Google Analytics del sitio real si abres la página; `develop` no lo carga. En la rama del rediseño ya no hay analítica (A4).
- En la consola de `develop` aparecen avisos de eslint (accesibilidad, variables sin uso) y de i18next; los conocidos están listados en [audit-2026-10.md](audit-2026-10.md).
