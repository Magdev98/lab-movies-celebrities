const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// Iteration #6: Adding New Movies

router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find().populate("cast");
    res.render("movies/movies", { allMovies });
  } catch (error) {
    next(error);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("movies/new-movie", { allCelebrities });
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  //create movie with destructuration object
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (error) {
    res.render("movies/new-movie");
  }
});

// Iteration #7: Listing Our Movies

router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.render("movies/movies", { movies: allMovies });
  } catch (error) {
    next(error);
  }
});

// Iteration #8: The Movie Details Page

router.get("/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((detailMovie) => {
      res.render("movies/movie-details", { movies: detailMovie });
    })
    .catch((error) => next(error));
});

// Iteration #9: Deleting Movies

router.post("/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => next(error));
});

module.exports = router;

// Iteration #10: Editing Movies