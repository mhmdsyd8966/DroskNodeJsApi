const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  NumberOfStudents: {
    type: Number,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a Teacher model
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  NumberOfLessons: {
    type: Number,
    required: true,
  },
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
