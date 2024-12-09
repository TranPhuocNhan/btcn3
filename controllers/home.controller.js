const Movie = require("../models/movie.model");
const Review = require("../models/review.model");

module.exports = {
  async homePage(req, res) {
    try {
      const moviesRating = await Movie.getMoviesRating();
      const topBoxOfficeMovies = await Movie.getTopBoxOfficeMovies();
      const topFavMovies = await Movie.getTopFavMovies();
      res.status(200);
      res.render("home", {
        moviesRating,
        topBoxOfficeMovies,
        topFavMovies,
      });
    } catch (err) {
      res.status(500).json("error-page", { message: err.message });
    }
  },
  async detailPage(req, res) {
    try {
      const movie = await Movie.getMovieById(req.params.id);
      const reviews = await Review.getReviewById(req.params.id);
      console.log(reviews);
      res.status(200);
      res.render("movie-detail", { movie });
    } catch (err) {
      res.status(500).json("error-page", { message: err.message });
    }
  },
};
