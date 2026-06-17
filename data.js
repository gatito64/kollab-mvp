/**
 * data.js — Datos simulados con estructura equivalente a la API de Trello
 * Caso Kollab · GPY1101 · MVP Parcial 3
 *
 * Estructura basada en:
 *   - Board  → tablero de Trello (cuenta / proyecto)
 *   - List   → columna del tablero (To Do, En curso, Revisión, Hecho)
 *   - Card   → tarea del tablero
 *   - Member → colaborador asignado a la tarjeta
 */

// ── Miembros del equipo Kollab ─────────────────────────────────
const MEMBERS = {
  MR: { id: "MR", name: "Marco Reyes",    team: "Desarrollo", color: "#4DD6C0", capacity: 6 },
  CL: { id: "CL", name: "Camila Luna",    team: "QA",         color: "#5C9BD9", capacity: 6 },
  JT: { id: "JT", name: "Javiera Torres", team: "Diseño",     color: "#F4B740", capacity: 6 },
  PA: { id: "PA", name: "Pablo Aros",     team: "Desarrollo", color: "#F4685B", capacity: 6 },
  SN: { id: "SN", name: "Sofía Núñez",   team: "Desarrollo", color: "#C792EA", capacity: 6 },
  DC: { id: "DC", name: "Diego Cofré",   team: "QA",         color: "#7FD1B9", capacity: 6 },
};

// ── Columnas / listas del tablero ─────────────────────────────
const LISTS = ["To Do", "En curso", "Revisión", "Hecho"];

// ── Tarjetas (Cards) simuladas desde los tableros de Trello ───
const CARDS = [
  { id: 1,  title: "Diseñar endpoint de sincronización de tareas",           list: "En curso",  account: "Banco Andino", project: "Portal Clientes",     member: "MR", due: "2026-06-18" },
  { id: 2,  title: "Revisar credenciales OAuth para integración Trello",     list: "To Do",     account: "Interno",      project: "Onboarding Interno",  member: "PA", due: "2026-06-25" },
  { id: 3,  title: "QA flujo de login App Logística",                        list: "Revisión",  account: "RetailPlus",   project: "App Logística",       member: "CL", due: "2026-06-10" },
  { id: 4,  title: "Migrar campos personalizados de CRM legado",             list: "En curso",  account: "Banco Andino", project: "Migración CRM",       member: "SN", due: "2026-06-09" },
  { id: 5,  title: "Maquetar dashboard de carga laboral",                    list: "Hecho",     account: "Interno",      project: "Onboarding Interno",  member: "JT", due: "2026-06-05" },
  { id: 6,  title: "Configurar Power-Up de etiquetas por cuenta",            list: "To Do",     account: "RetailPlus",   project: "App Logística",       member: "DC", due: "2026-06-22" },
  { id: 7,  title: "Corregir bug de notificaciones duplicadas",              list: "En curso",  account: "Banco Andino", project: "Portal Clientes",     member: "PA", due: "2026-06-08" },
  { id: 8,  title: "Documentar API de tareas para stakeholders",             list: "To Do",     account: "Interno",      project: "Migración CRM",       member: "MR", due: "2026-06-30" },
  { id: 9,  title: "Pruebas de carga del módulo de reportes",                list: "Revisión",  account: "Banco Andino", project: "Portal Clientes",     member: "DC", due: "2026-06-15" },
  { id: 10, title: "Actualizar paleta y guía visual del portal",             list: "Hecho",     account: "RetailPlus",   project: "App Logística",       member: "JT", due: "2026-06-02" },
  { id: 11, title: "Integrar webhook de comentarios Trello → Slack",        list: "En curso",  account: "Interno",      project: "Onboarding Interno",  member: "SN", due: "2026-06-20" },
  { id: 12, title: "Refactor de servicio de autenticación CRM",              list: "To Do",     account: "Banco Andino", project: "Migración CRM",       member: "SN", due: "2026-06-28" },
  { id: 13, title: "Validar accesibilidad de formulario de registro",        list: "Revisión",  account: "RetailPlus",   project: "App Logística",       member: "CL", due: "2026-06-12" },
  { id: 14, title: "Preparar reporte de avance para CTO",                    list: "Hecho",     account: "Interno",      project: "Onboarding Interno",  member: "MR", due: "2026-06-01" },
  { id: 15, title: "Optimizar consultas del panel de métricas",              list: "En curso",  account: "Banco Andino", project: "Portal Clientes",     member: "MR", due: "2026-06-07" },
  { id: 16, title: "Definir criterios de aceptación módulo reportes",        list: "To Do",     account: "Banco Andino", project: "Portal Clientes",     member: "DC", due: "2026-06-19" },
  { id: 17, title: "Diseñar pantallas de notificaciones push",               list: "To Do",     account: "RetailPlus",   project: "App Logística",       member: "JT", due: "2026-06-26" },
  { id: 18, title: "Revisar SLA de respuesta del equipo QA",                 list: "En curso",  account: "Interno",      project: "Onboarding Interno",  member: "CL", due: "2026-06-11" },
  { id: 19, title: "Implementar paginación en listado de proyectos",         list: "Revisión",  account: "Banco Andino", project: "Portal Clientes",     member: "PA", due: "2026-06-14" },
  { id: 20, title: "Capacitar equipo en uso de Power-Ups de Trello",         list: "Hecho",     account: "Interno",      project: "Onboarding Interno",  member: "DC", due: "2026-06-03" },
];

// Fecha de referencia del MVP (hoy)
const TODAY = "2026-06-17";
