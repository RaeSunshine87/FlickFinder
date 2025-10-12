
const form  = document.getElementById("search-form");
const input = document.getElementById("search-input");
const grid  = document.getElementById("results-grid");


function spinner() {
  return `
    <div class="loading" style="grid-column: 1 / -1;">
      <i class="fa-solid fa-spinner fa-spin fa-3x loading__icon"></i>
    </div>
  `;
}

function renderMessage(html) {
  grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:1rem">${html}</div>`;
}

function toCard(item) {
  const title = item.title ?? "Untitled";
  const img   = item.images?.jpg?.image_url ?? "";
  const meta  = [
    item.type || null,
    item.episodes ? `${item.episodes} eps` : null,
    item.year || item.aired?.prop?.from?.year || null
  ].filter(Boolean).join(" • ");

  return `
    <article class="movie__card">
      <img class="movie__card--img" src="${img}" alt="${title}">
      <div class="card__body">
        <h3 class="card__title">${title}</h3>
        <p class="card__meta">${meta}</p>
      </div>
    </article>
  `;
}

function renderItems(items, emptyMessage = "No results.") {
  if (!items || items.length === 0) {
    renderMessage(emptyMessage);
    return;
  }
  grid.innerHTML = items.map(toCard).join("");
}