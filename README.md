# Kollab Insights — MVP
### Caso Kollab · GPY1101 · Evaluación Parcial 3

---

## ¿Qué es esto?

MVP (Producto Mínimo Viable) funcional que demuestra la viabilidad técnica
de la alternativa seleccionada: **adquisición de Trello** como plataforma
integrada de gestión del trabajo para Kollab.

---

## Estructura del proyecto

```
kollab-mvp/
├── index.html          ← Página principal (abre aquí)
├── css/
│   └── styles.css      ← Estilos visuales
├── js/
│   ├── data.js         ← Datos simulados (estructura equivalente a API Trello)
│   └── app.js          ← Lógica: filtros, renderizado, KPIs, carga laboral
└── README.md           ← Este archivo
```

---

## Cómo abrir el proyecto en VS Code

### Opción 1 — Live Server (recomendado para demostración)
1. Abre VS Code
2. Ve a **Archivo → Abrir carpeta…** y selecciona la carpeta `kollab-mvp`
3. Instala la extensión **Live Server** (si no la tienes):
   - `Ctrl+Shift+X` → buscar "Live Server" → Instalar
4. Haz clic derecho sobre `index.html` → **Open with Live Server**
5. El navegador abrirá el panel automáticamente en `http://127.0.0.1:5500`

### Opción 2 — Abrir directo en navegador
1. Navega a la carpeta `kollab-mvp`
2. Haz doble clic en `index.html`
3. Se abre directamente en tu navegador sin necesidad de servidor

---

## Requerimiento funcional que resuelve

**Pérdida de visibilidad del trabajo + sobrecarga laboral**
(Requerimiento principal identificado en la Parcial 1 del caso Kollab)

### Funcionalidades del MVP:
- Tablero Kanban con 4 columnas de Trello (To Do, En curso, Revisión, Hecho)
- Filtros en tiempo real por: **cuenta, proyecto, equipo y fecha de vencimiento**
- 4 KPIs: total de tareas, tareas vencidas, % de avance, colaboradores sobrecargados
- Panel de carga laboral por colaborador con barras y semáforo de colores
- Tarjetas vencidas destacadas visualmente

---

## Tecnologías utilizadas

| Tecnología | Uso |
|-----------|-----|
| HTML5 | Estructura del panel |
| CSS3 + Variables CSS | Estilos, tema oscuro, responsividad |
| JavaScript ES6 | Lógica de filtros y renderizado dinámico |
| Google Fonts | Inter, Sora, JetBrains Mono |

> Sin frameworks ni dependencias externas. Funciona con cualquier navegador moderno.

---

## Modelo de datos

Los datos en `js/data.js` replican la estructura de la API REST de Trello:
- **MEMBERS** → colaboradores de Kollab (equivalente a `GET /members`)
- **CARDS** → tareas del tablero con lista, cuenta, proyecto, responsable y fecha
- **LISTS** → columnas del tablero (equivalente a `GET /boards/{id}/lists`)

En producción: se conectaría via OAuth + API REST de Trello con actualización
por webhooks, sin cambiar la capa de visualización.

---

## Limitaciones del MVP

1. Datos estáticos (en producción: API REST de Trello + OAuth por cuenta)
2. Capacidad fija de 6 tareas por colaborador (en producción: configurable por equipo)
3. No incluye aún integración con Slack (Power-Up — fase 2)
4. Un conjunto acotado de tarjetas representativas (en producción: todos los tableros)
