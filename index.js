
const movieDIV = document.querySelector(".results");
const searchForm = document.getElementById("search-form");
const searchInput = document.querySelector(".search-bar")
console.log(movieDIV);

document.addEventListener("DOMContentLoaded", async () => {
  try {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=71a1f110&s`
  );
  const data = await response.json();
  console.log(data);
  renderMovies(data.Search);
  } catch (error) {
    console.log("error", error);
  }
});

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // console.log("Search");
  const searchTerm = encodeURIComponent(searchInput.value);
  const urlEncodedSearchString = encodeURIComponent(searchTerm);
  // console.log(searchTerm);

  try {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=71a1f110&s=${searchTerm}`
  );
  const data = await response.json();

  // axios.get("http://www.omdbapi.com/?apikey=3430a78&s=" + urlEncodedSearchString
  // )
  // .then (function(response) {
  //   console.log(response.data);
  // })

  console.log(data);
  renderMovies(data.Search); 
  } catch (error) {
    console.log("Error:", error);
  }
}) 

function renderMovies(data) {
  movieDIV.innerHTML = "";
  data.forEach((movie) => {
    // console.log(movie);
    const div = document.createElement("div");
    div.className = "col-4 my-2";

    div.innerHTML = `
    <div class="movie">
		<img src="${movie.Poster}" class="card-img-top">
		<div class="card-body">
		<h5 class="card-title">${movie.Title}</h5>
		${movie.Title}<p class="card-text">${movie.Year}</p>
		<a href="#" class="btn btn-primary" onclick="saveToWatchlist('${movie.imdbID}')">Add</a>
		</div>
    </div>`;
    movieDIV.appendChild(div);

    document
      .getElementById("search-form")
      .addEventListener("submit", async function (e) {
        e.preventDefault();
        let searchString = document.querySelector('.search-bar').value;      
        var urlEncodeSearchString = encodeURIComponent(searchString);

        const response = await fetch(`https://www.omdbapi.com/?apikey=71a1f110&s=${searchString}`)
        let data = await response.json()
        // renderMovies(movieData);


      //console.log(searchString);
      });
  });
}

async function saveToWatchlist(imdbID) {
  let watchlist = null;
  const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=71a1f110`)
  const movie = await response.json()
  console.log("Save to Watchlist Movie", movie);

  let watchlistJSON = localStorage.getItem("watchlist");
  //console.log(watchlistJSON);
  // console.log(JSON.parse(watchlistJSON));

  if (watchlistJSON == null) {
    watchlist = [];
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  } else {
    let watchlist = JSON.parse(watchlistJSON);
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
}

document.getElementById("clear").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("watchlist");
})


  // let movie = movieData.find(function find(currentMovie) {
  //   return currentMovie.imdbID == imdbID;
  // });
  // console.log(movie);

        // const searchMovies = movieData.filter((movie) => {
        //   return (
        //     movie.Title.toLowerCase.includes(searchString.toLowerCase()) ||
        //     movie.Year.includes(searchString) ||
        //     movie.imdbID.includes(searchString)
        //   );
        // });
        // console.log(searchMovies);
        // renderMovies(searchMovies);