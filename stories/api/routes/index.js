const router = require("express").Router();
const storiesController = require("../controllers/stories.controller");

router.route("/stories")
  .get(storiesController.getAll);

router.route("/stories/:storyId")
  .get(storiesController.getStoryById);

router.route("/stories/popularity/:storyId")
  .get(storiesController.updatePopularityById);

module.exports = router;