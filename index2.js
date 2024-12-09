const Movie = require("./models/movie.model.js");
const Name = require("./models/name.model.js");
Movie.getMoviesRating()
  .then((movies) => {
    console.log("Movies:", movies[1].id);
  })
  .catch((error) => {
    console.error("Error fetching movies:", error);
  });
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
// Name.getDetailActor("nm0000122")
//   .then((name) => {
//     console.log("name:", name);
//   })
//   .catch((error) => {
//     console.error("Error fetching name:", error);
//   });
// const actorList = ["nm0000008", "nm0000020"];
// Name.getActors(actorList)
//   .then((name) => {
//     console.log("name:", name);
//   })
//   .catch((error) => {
//     console.error("Error fetching name:", error);
//   });
// Name.getRelatedMovies("nm0000008")
//   .then(({ actors, moviesRelated }) => {
//     // console.log("actors:", moviesRelated);
//     moviesRelated.forEach((movie) => {
//       movie.actorList.forEach((actor) => {
//         console.log(actor);
//       });
//     });
//     // console.log("moviesRelated:", moviesRelated);
//   })
//   .catch((error) => {
//     console.error("Error fetching name:", error);
//   });

// Name.search("marlon")
//   .then((name) => {
//     console.log("name:", name);
//   })
//   .catch((error) => {
//     console.error("Error fetching name:", error);
//   });
