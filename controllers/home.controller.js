const Movie = require("../models/movie.model");
const Review = require("../models/review.model");
const Name = require("../models/name.model");
const { QueryFile } = require("pg-promise");

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
      const actors = movie.actorlist;
      const reviews = await Review.getReviewById(req.params.id);

      res.status(200);
      res.render("movie-detail", { movie, reviews, actors });
    } catch (err) {
      res.status(500).json("error-page", { message: err.message });
    }
  },
  async actorPage(req, res) {
    try {
      const actor = await Name.getDetailActor(req.params.id);
      if (!actor) {
        return res
          .status(404)
          .render("error-page", { message: "Actor not found" });
      }
      const movies = await Name.getRelatedMovies(req.params.id);
      res.status(200);
      res.render("actor-detail", { actor, movies });
    } catch (err) {
      res.status(500).render("error-page", { message: err.message });
    }
  },
  async searchPage(req, res) {
    try {
      const q = req.query.q;
      const page = parseInt(req.query.page) || 1;
      const itemsPerPage = 5;

      const allMovies = await Movie.search(q);

      // Tinhs toans
      const totalItems = allMovies.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      const previousPage = page > 1 ? page - 1 : null;
      const nextPage = page < totalPages ? page + 1 : null;

      const skip = (page - 1) * itemsPerPage;
      const movies = allMovies.slice(skip, skip + itemsPerPage);

      let condition = true;
      if (!movies) {
        condition = false;
      }
      res.status(200);
      res.render("search", {
        movies,
        condition,
        totalItems,
        totalPages,
        page,
        q,
        previousPage,
        nextPage,
      });
    } catch (err) {
      res.status(500).render("error-page", { message: err.message });
    }
  },
  async searchActorPage(req, res) {
    try {
      const q = req.query.q;
      const page = parseInt(req.query.page) || 1;
      const itemsPerPage = 5;

      const actorss = await Name.search(q);

      // Tinhs toans
      const totalItems = actorss.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      const previousPage = page > 1 ? page - 1 : null;
      const nextPage = page < totalPages ? page + 1 : null;

      const skip = (page - 1) * itemsPerPage;
      const actors = actorss.slice(skip, skip + itemsPerPage);

      let condition = true;
      if (!actors) {
        condition = false;
      }
      res.status(200);
      res.render("search-actor", {
        actors,
        condition,
        totalItems,
        totalPages,
        page,
        q,
        previousPage,
        nextPage,
      });
    } catch (err) {
      res.status(500).render("error-page", { message: err.message });
    }
  },
};
