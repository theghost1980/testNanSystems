# Changelog

Documento **vivo**. Una entrada por cambio relevante, la más reciente arriba.
Formato: fecha · ID del [roadmap](roadmap.md) · qué cambió · rama o PR · riesgo para producción.

## 2026-10-10

- **docs** · R0, R0b · Se actualizan `roadmap.md` (nuevo A6, R0/R0b hechos, nueva pieza vertical R1a, decisiones abiertas), `redesign.md` (estado, revisión independiente, requisitos para portar) y `dev-log.md` (2.ª sesión), y se completa el hash del primer commit. Solo documentación; el paquete del rediseño (`nansystems-nx`) vive fuera del repo. · rama `docs/project-documentation` · riesgo: ninguno.
- **docs** · Se crea la carpeta `docs/` con README, guía de instalación local, arquitectura, despliegue en Netlify, flujo de trabajo, auditoría, roadmap, plan de rediseño y bitácora de sesiones (`dev-log.md`). Solo archivos nuevos; no se modifica código ni configuración. · rama `docs/project-documentation` · riesgo: ninguno (Gatsby ignora esta carpeta; el merge lanza un build de producción sin cambios visibles).
- **Entorno** · Se documenta cómo instalar Node 14.21.3 en Windows saltando el bug de nvm-windows 1.2.2. Sin cambios en el repo.
