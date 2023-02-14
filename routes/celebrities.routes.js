const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res, next) => {
 //create celebrity with destructuration object
 const {name, occupation, catchPhrase} = req.body
  try {
    await Celebrity.create({name, occupation, catchPhrase});
    res.redirect("/celebrities");
  } catch (error) {
    res.render("celebrities/new-celebrity");
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities: allCelebrities });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
