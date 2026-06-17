/**
 * app.js — Lógica principal del panel Kollab Insights
 * Caso Kollab · GPY1101 · MVP Parcial 3
 *
 * Responsabilidades:
 *  1. Leer los filtros del usuario
 *  2. Filtrar las tarjetas (CARDS) según los criterios seleccionados
 *  3. Renderizar el tablero Kanban
 *  4. Actualizar los KPIs
 *  5. Renderizar el panel de carga laboral
 */

// ────────────────────────────────────────────────────────────────
// Utilidades
// ────────────────────────────────────────────────────────────────

/**
 * Devuelve las iniciales de un nombre completo (máx. 2 caracteres).
 * Ej: "Marco Reyes" → "MR"
 */
function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Determina si una tarjeta está vencida:
 *  - Su fecha de vencimiento es anterior a TODAY
 *  - Y aún NO está en la columna "Hecho"
 */
function isOverdue(card) {
  return card.due < TODAY && card.list !== "Hecho";
}

// ────────────────────────────────────────────────────────────────
// Filtrado de tarjetas
// ────────────────────────────────────────────────────────────────

/**
 * Lee los valores actuales de los filtros del DOM y
 * devuelve el subconjunto de CARDS que los cumple.
 */
function getFilteredCards() {
  const account  = document.getElementById("f-account").value;
  const project  = document.getElementById("f-project").value;
  const team     = document.getElementById("f-team").value;
  const dateFrom = document.getElementById("f-date").value;

  return CARDS.filter((card) => {
    if (account  && card.account !== account)              return false;
    if (project  && card.project !== project)              return false;
    if (team     && MEMBERS[card.member].team !== team)    return false;
    if (dateFrom && card.due < dateFrom)                   return false;
    return true;
  });
}

// ────────────────────────────────────────────────────────────────
// Renderizado del tablero Kanban
// ────────────────────────────────────────────────────────────────

/**
 * Construye el HTML de una tarjeta individual.
 */
function buildCardHTML(card) {
  const member   = MEMBERS[card.member];
  const overdue  = isOverdue(card);
  const dueLabel = overdue ? `⚠ Vencida · ${card.due}` : card.due;
  const dueClass = overdue ? "card__due card__due--overdue" : "card__due";

  return `
    <div class="card">
      <div class="card__tags">
        <span class="tag tag--project">${card.project}</span>
        <span class="tag tag--account">${card.account}</span>
      </div>
      <div class="card__title">${card.title}</div>
      <div class="card__meta">
        <span class="${dueClass}">${dueLabel}</span>
        <span
          class="avatar"
          style="background: ${member.color}"
          title="${member.name}"
        >${getInitials(member.name)}</span>
      </div>
    </div>`;
}

/**
 * Renderiza las 4 columnas del tablero con las tarjetas filtradas.
 */
function renderBoard(cards) {
  const boardEl = document.getElementById("board");
  boardEl.innerHTML = "";

  LISTS.forEach((listName) => {
    const listCards = cards.filter((c) => c.list === listName);

    // Columna
    const colEl = document.createElement("div");
    colEl.className = "column";
    colEl.innerHTML = `
      <div class="column__header">
        <span>${listName}</span>
        <span class="column__count">${listCards.length}</span>
      </div>`;

    if (listCards.length === 0) {
      colEl.innerHTML += `<div class="column__empty">Sin tarjetas</div>`;
    } else {
      listCards.forEach((card) => {
        colEl.innerHTML += buildCardHTML(card);
      });
    }

    boardEl.appendChild(colEl);
  });
}

// ────────────────────────────────────────────────────────────────
// Renderizado de KPIs
// ────────────────────────────────────────────────────────────────

/**
 * Actualiza los 4 indicadores clave según las tarjetas filtradas.
 */
function renderKPIs(cards) {
  const total    = cards.length;
  const overdueN = cards.filter(isOverdue).length;
  const done     = cards.filter((c) => c.list === "Hecho").length;
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  // Contar sobrecargados (lógica idéntica a renderWorkload)
  let overloadCount = 0;
  Object.keys(MEMBERS).forEach((key) => {
    const active = cards.filter((c) => c.member === key && c.list !== "Hecho").length;
    const pct    = (active / MEMBERS[key].capacity) * 100;
    if (pct > 100) overloadCount++;
  });

  document.getElementById("kpi-total").textContent    = total;
  document.getElementById("kpi-overdue").textContent  = overdueN;
  document.getElementById("kpi-overdue-delta").textContent =
    overdueN > 0 ? `${overdueN} tarea(s) requieren atención inmediata` : "Sin retrasos activos";

  document.getElementById("kpi-progress").textContent = `${progress}%`;

  document.getElementById("kpi-overload").textContent = overloadCount;
  document.getElementById("kpi-overload-delta").textContent =
    overloadCount > 0 ? "colaboradores por encima del 100% de capacidad" : "Carga distribuida correctamente";
}

// ────────────────────────────────────────────────────────────────
// Renderizado del panel de carga laboral
// ────────────────────────────────────────────────────────────────

/**
 * Clasifica el nivel de carga y devuelve la clase CSS correspondiente.
 */
function loadLevel(pct) {
  if (pct > 100) return "bad";
  if (pct >= 70)  return "warn";
  return "ok";
}

/**
 * Renderiza la lista de colaboradores con sus barras de carga laboral.
 */
function renderWorkload(cards) {
  const wlEl = document.getElementById("workload");
  wlEl.innerHTML = "";

  Object.values(MEMBERS).forEach((member) => {
    const activeTasks = cards.filter(
      (c) => c.member === member.id && c.list !== "Hecho"
    ).length;
    const pct   = Math.round((activeTasks / member.capacity) * 100);
    const level = loadLevel(pct);
    const barW  = Math.min(pct, 100); // la barra no supera el 100% visualmente

    wlEl.innerHTML += `
      <div class="member-row">
        <span
          class="avatar"
          style="background: ${member.color}"
          title="${member.name}"
        >${getInitials(member.name)}</span>
        <div class="member-row__info">
          <div class="member-row__name">${member.name}</div>
          <div class="member-row__team">${member.team} · ${activeTasks} activas</div>
        </div>
        <div class="load-wrap">
          <div class="load-bar">
            <span
              class="load-bar__fill load-bar__fill--${level}"
              style="width: ${barW}%"
            ></span>
          </div>
          <div class="load-pct load-pct--${level}">${pct}%</div>
        </div>
      </div>`;
  });
}

// ────────────────────────────────────────────────────────────────
// Ciclo de renderizado principal
// ────────────────────────────────────────────────────────────────

/**
 * Punto de entrada: filtra y re-renderiza todos los componentes.
 * Se llama al cargar la página y cada vez que cambia un filtro.
 */
function render() {
  const filtered = getFilteredCards();
  renderBoard(filtered);
  renderKPIs(filtered);
  renderWorkload(filtered);
}

// ────────────────────────────────────────────────────────────────
// Event listeners
// ────────────────────────────────────────────────────────────────

// Cambio en cualquier filtro → re-renderizar
["f-account", "f-project", "f-team", "f-date"].forEach((id) => {
  document.getElementById(id).addEventListener("change", render);
});

// Botón "Limpiar filtros"
document.getElementById("reset-btn").addEventListener("click", () => {
  document.getElementById("f-account").value = "";
  document.getElementById("f-project").value = "";
  document.getElementById("f-team").value    = "";
  document.getElementById("f-date").value    = "2026-06-01";
  render();
});

// Renderizado inicial al cargar la página
render();
