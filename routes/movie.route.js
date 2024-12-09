const router = require("express").Router();
const movieController = require("../controllers/home.controller");

router.get("/", movieController.homePage);
router.get("/movie/:id", movieController.detailPage);
router.get("/actor/:id", movieController.actorPage);
module.exports = router;
router.get("/search", movieController.searchPage);
router.get("/search/actor", movieController.searchActorPage);
