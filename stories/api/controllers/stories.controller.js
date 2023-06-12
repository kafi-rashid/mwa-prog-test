const mongoose = require("mongoose");

const Story = mongoose.model("Story");

const response = {
  status: 200,
  message: null,
  data: null
}

const getAll = function(req, res) {
  let offset = 0;
  let count = 10;
  if (req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query.count) {
    if (req.query.count <= 20) {
      count = parseInt(req.query.count, 10);
    } else {
      response.status = 200;
      response.message = "Count can not be more than 20!";
      response.data = null;
      res.status(response.status).json(response);
    }
  }
  Story.find()
    .skip(offset)
    .limit(count)
    .exec()
    .then((stories) => {
      if (stories && stories.length > 0) {
        response.status = 200;
        response.message = stories.length + " stories found!";
        response.data = stories;
      }
      else {
        response.status = 404;
        response.message = "Stories not found!";
        response.data = null;
      }
    })
    .catch((error) => {
      response.status = 500;
      response.message = error;
      response.data = null;
    })
    .finally(() => {
      res.status(response.status).json(response);
    })
}

const getStoryById = function(req, res) {
  const storyId = req.params.storyId;
  Story.findById(storyId)
    .exec()
    .then((story) => {
      if (story) {
        response.status = 200;
        response.message = "Story found!";
        response.data = story;
      }
      else {
        response.status = 404;
        response.message = "Story not found!";
        response.data = null;
      }
    })
    .catch((error) => {
      response.status = 500;
      response.message = error;
      response.data = null;
    })
    .finally(() => {
      res.status(response.status).json(response);
    })
}

const updatePopularityById = function(req, res) {
  const storyId = req.params.storyId;
  Story.findById(storyId)
    .exec()
    .then((story) => {
      if (story) {
        story.status = story.status ? (story.status.toLowerCase() === "popular" ? "un-popular" : "popular") : "popular";
        story.save()
          .then((story) => {
            response.status = 200;
            response.message = "Popularity updated";
            response.data = story;
          })
          .catch((error) => {
            response.status = 500;
            response.message = error;
            response.data = null;
          });
      }
      else {
        response.status = 404;
        response.message = "Story not found!";
        response.data = null;
      }
    })
    .catch((error) => {
      response.status = 500;
      response.message = error;
      response.data = null;
    })
    .finally(() => {
      res.status(response.status).json(response);
    })
}

module.exports = {
  getAll,
  getStoryById,
  updatePopularityById
}