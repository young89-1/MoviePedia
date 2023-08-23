let movieDIV = document.querySelector(".results");
console.log(movieDIV);

document.addEventListener("DOMContentLoaded", () => {
  const movieData = JSON.parse(localStorage.getItem("watchlist"));
  renderMovies(movieData);
});

function renderMovies(data) {
  movieDIV.innerHTML = "";
  data.forEach((movie) => {
    console.log(movie);
    const div = document.createElement("div");
    div.className = "col-4 my-2";

    div.innerHTML = `
      <div class="movie">
          <img src="${movie.Poster}" class="card-img-top" alt="Dark Knight">
          <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          ${movie.Title}<p class="card-text">${movie.Year}</p>
          <a href="#" class="btn btn-primary" onclick="saveToWatchlist('${movie.imdbID}')" >Add</a>
          </div>
      </div>`;
    movieDIV.appendChild(div);
  });
}

document.getElementById("clear").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("watchlist");
})
