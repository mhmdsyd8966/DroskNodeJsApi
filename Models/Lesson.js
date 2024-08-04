const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pdfLink: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Package",
    required: true,
  },
  photo: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
