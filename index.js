const Movie = require("./models/movie.model.js");
const Name = require("./models/name.model.js");
// Movie.getMoviesRating()
//   .then((movies) => {
//     console.log("Movies:", movies);
//   })
//   .catch((error) => {
//     console.error("Error fetching movies:", error);
//   });
// Movie.getTopBoxOfficeMovies()
//   .then((movies) => {
//     console.log("Movies:", movies);
//   })
//   .catch((error) => {
//     console.error("Error fetching movies:", error);
//   });
// Movie.getAllMovies()
//   .then((movies) => {
//     console.log("Movies:", movies);
//   })
//   .catch((error) => {
//     console.error("Error fetching movies:", error);
//   });
// Movie.getMovieById("tt0012349")
//   .then((movies) => {
//     console.log("Movies:", movies);
//   })
//   .catch((error) => {
//     console.error("Error fetching movies:", error);
//   });
// Movie.getTopFavMovies()
//   .then((movies) => {
//     console.log("Movies:", movies);
//   })
//   .catch((error) => {
//     console.error("Error fetching movies:", error);
//   });
// Movie.getAllFavMovies()
//   .then((movies) => {
//     console.log("Movies:", movies);
//   })
//   .catch((error) => {
//     console.error("Error fetching movies:", error);
//   });

// ----- Name -----
Name.getDetailActor("nm0000122")
  .then((name) => {
    console.log("name:", name);
  })
  .catch((error) => {
    console.error("Error fetching name:", error);
  });
