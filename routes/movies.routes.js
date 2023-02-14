const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find().populate("cast");
    res.render("movies/movies", { allMovies });
  } catch (error) {
    next(error);
  }
});

router.get('/create', async (req, res, next) => {
    try {
        const allCelebrities = await Celebrity.find();
        res.render("movies/new-movie", { allCelebrities });
    } catch (error) {
        next(error);
    }
})

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

router.get("/", async (req, res, next) => {
    try {
      const allMovies = await Movie.find();
      res.render("movies/movies", { movies: allMovies });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
