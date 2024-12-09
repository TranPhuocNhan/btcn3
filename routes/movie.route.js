const router = require("express").Router();
const movieController = require("../controllers/home.controller");

router.get("/", movieController.homePage);
router.get("/movie/:id", movieController.detailPage);

module.exports = router;
