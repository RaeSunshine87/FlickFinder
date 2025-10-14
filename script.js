const apiKey = "e19fddd4";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const movieGrid = document.getElementById("movieGrid");
const sortFilter = document.getElementById("sortFilter");

// Modal elements
const modal = document.getElementById("movieModal");
const closeModal = document.querySelector(".modal__close");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalYear = document.getElementById("modalYear");
const modalGenre = document.getElementById("modalGenre");
const modalRating = document.getElementById("modalRating");
const modalActors = document.getElementById("modalActors");
const modalPlot = document.getElementById("modalPlot");

let currentMovies = [];

// Fetch movies
async function searchMovies(query) {
  const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
  const data = await response.json();
  movieGrid.innerHTML = "";

  if (data.Search) {
    currentMovies = data.Search;
    renderMovies(currentMovies);
  } else {
    movieGrid.innerHTML = `<p style="color:#888;">No results found.</p>`;
  }
}

function spinner() {
  return `
    <div class="loading" style="grid-column: 1 / -1;">
      <i class="fa-solid fa-spinner fa-spin fa-3x loading__icon"></i>
    </div>
  `;
}

// Display movie cards
function renderMovies(movies) {
  movieGrid.innerHTML = "";
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movies__card");
    card.dataset.imdbid = movie.imdbID;
    card.innerHTML = `
      <img class="movies__img" src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300"}" alt="${movie.Title}">
      <div class="movies__info">
        <h3 class="movies__title">${movie.Title}</h3>
        <p class="movies__year">${movie.Year}</p>
      </div>
    `;
    card.addEventListener("click", () => showMovieDetails(movie.imdbID));
    movieGrid.appendChild(card);
  });
}

// Show modal details
async function showMovieDetails(imdbID) {
  const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
  const data = await response.json();

  modalPoster.src = data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/300x450";
  modalTitle.textContent = data.Title;
  modalYear.textContent = data.Year;
  modalGenre.textContent = data.Genre;
  modalRating.textContent = data.imdbRating;
  modalActors.textContent = data.Actors;
  modalPlot.textContent = data.Plot;

  modal.style.display = "flex";
}

// Close modal
closeModal.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

// Sort
function sortMovies(order) {
  if (order === "newest") {
    currentMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  } else if (order === "oldest") {
    currentMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  }
  renderMovies(currentMovies);
}

// Event listeners
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) searchMovies(query);
});

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") searchMovies(searchInput.value.trim());
});

sortFilter.addEventListener("change", e => sortMovies(e.target.value));

// Default search
searchMovies("Guardians of the Galaxy");