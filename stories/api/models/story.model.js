const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  registered: Number,
  icon: String,
  profileviews: Number 
});

const containerSchema = mongoose.Schema({
  name: String,
  short_name: String
});

const topicSchema = mongoose.Schema({
  name: String,
  short_name: String
});

const storySchema = mongoose.Schema({
  title: String,
  container: containerSchema,
  topic: topicSchema,
  media: String,
  comments: String,
  description: String,
  status: String,
  user: userSchema,
  submit_date: Number,
  promote_date: Number,
  diggs: Number,
  href: String,
  id: String,
  link: String
});

mongoose.model("Story", storySchema, "stories");