# Changelog

Documento **vivo**. Una entrada por cambio relevante, la más reciente arriba.
Formato: fecha · ID del [roadmap](roadmap.md) · qué cambió · rama o PR · riesgo para producción.

## 2026-10-10

- **fix** · A6 · `src/pages/portfolio.js`: las dos consultas (ES/EN) dejan de pedir cuatro campos que la página no usa; el JSON público de la página pasa de 28.339 a 13.840 bytes y deja de incluirlos. La página se ve igual (11 filas, empleo actual, enlaces y acordeón comprobados en ES y EN). Solo se borran 32 líneas. · rama `fix/portfolio-total-refactor-design-2026` · riesgo: bajo. Queda pendiente publicarlo y revisar los deploys antiguos de Netlify y el contenido en DatoCMS.
- **docs** · R0, R0b · Se actualizan `roadmap.md` (nuevo A6, R0/R0b hechos, nueva pieza vertical R1a, decisiones abiertas), `redesign.md` (estado, revisión independiente, requisitos para portar) y `dev-log.md` (2.ª sesión), y se completa el hash del primer commit. Solo documentación; el paquete del rediseño (`nansystems-nx`) vive fuera del repo. · rama `docs/project-documentation` · riesgo: ninguno.
- **docs** · Se crea la carpeta `docs/` con README, guía de instalación local, arquitectura, despliegue en Netlify, flujo de trabajo, auditoría, roadmap, plan de rediseño y bitácora de sesiones (`dev-log.md`). Solo archivos nuevos; no se modifica código ni configuración. · rama `docs/project-documentation` · riesgo: ninguno (Gatsby ignora esta carpeta; el merge lanza un build de producción sin cambios visibles).
- **Entorno** · Se documenta cómo instalar Node 14.21.3 en Windows saltando el bug de nvm-windows 1.2.2. Sin cambios en el repo.
