// function greating(name){
//     console.log(`Hello, ${name}`);
// }
// function processName(callback){
//     let name = "Bob";
//     callback(name)
// }
// processName(greating)

// const country = document.querySelector(".country");
// const GetCountry = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   request.addEventListener("load", function () {
//     const data = JSON.parse(this.responseText);
//     console.log(data);
//     document.body.innerHTML += `
//     <div class="country_card">
//       <div class="flag">
//         <img src=${data[0].flags.png} alt="" />
//       </div>
//       <div class="info">
//         <div class="details">დედაქალაქი: ${data[0].capital}</div>
//         <div class="details">კონტინენტი: ${data[0].continents}</div>
//         <div class="details">მეზობელი: ${data[0].borders[2]}</div>
//         <div class="details">მეზობელი: ${data[0].population}</div>
//       </div>
//     </div>`;
//   });
// };
// GetCountry("germany")
// GetCountry("poland")
// GetCountry("russia")

const movieContainer = document.querySelector(".container");
const form = document.querySelector(".search_container");
const searchBar = document.querySelector(".search_bar");
const searchButton = document.querySelector(".searchbar_button");
const backPage = document.querySelector(".back_page");
const nextPage = document.querySelector(".next_page");

const Url =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ec8d1f53446d8567da75d0398f6ecd39&page=";
const searchUrl =
  "https://api.themoviedb.org/3/search/movie?api_key=ec8d1f53446d8567da75d0398f6ecd39&query=";

let currentPage = 1;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const filmName = searchBar.value.trim();
  if (!filmName) return;

  const fullUrl = searchUrl + encodeURIComponent(filmName);

  fetch(fullUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        const movieId = data.results[0].id;
        window.location.href = `https://www.themoviedb.org/movie/${movieId}`;
      } else {
        console.log("ფილმი ვერ მოიძებნა");
      }
    })
    .catch((error) => console.error("შეცდომა:", error));
});

const showMovie = function (page) {
  movieContainer.innerHTML = "";

  const request = new XMLHttpRequest();
  request.open("GET", `${Url}${page}`);
  request.send();

  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    console.log(data);
    const result = data.results;

    result.map((movie) => {
      let rating = Math.round(movie.vote_average);

      movieContainer.innerHTML += `<div class="movie_card">
        <div class="poster">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" data-movie-id="${movie.id}">
        </div>
        <div class="movie_info">
          <div class="movie_title">${movie.title}</div>
          <div class="overview">${movie.overview}</div>
          <div class="vote_average">${rating}⭐</div>
        </div>
      </div>`;
    });

    document.querySelectorAll(".poster img").forEach((img) => {
      img.addEventListener("click", function () {
        const movieId = this.getAttribute("data-movie-id");
        window.location.href = `https://www.themoviedb.org/movie/${movieId}`;
      });
    });
  });
};

showMovie(currentPage);

backPage.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    showMovie(currentPage);
  }
});

nextPage.addEventListener("click", function () {
  currentPage++;
  showMovie(currentPage);
});
