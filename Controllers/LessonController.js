// Suggested code may be subject to a license. Learn more: ~LicenseLog:611947565.
const Lesson = require("../Models/Lesson");

const LessonController = {
  // Get all lessons by packageId
  async getLessonsByPackageId(req, res) {
    try {
      const packageId = req.params.packageId;
      const lessons = await Lesson.find({ packageId });
      res
        .status(200)
        .json({ message: "Get Lesson Successfully!!", lessons: lessons });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // Get lesson by ID
  async getLessonById(req, res) {
    try {
      const lessonId = req.params.id;
      const lesson = await Lesson.findById(lessonId);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res
        .status(200)
        .json({ message: "Get Lesson Successfully!!", lesson: lesson });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // Add a new lesson to a package
  async addLessonToPackage(req, res) {
    try {
      const packageId = req.params.packageId;
      console.log(packageId);
      const { name, pdfLink, videoLink, photo, description } = req.body;
      const newLesson = new Lesson({
        name,
        pdfLink,
        videoLink,
        packageId,
        photo,
        description,
      });
      await newLesson.save();
      res.status(200).json({ message: "Lesson added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // Update a lesson
  async updateLesson(req, res) {
    try {
      const lessonId = req.params.id;
      const { name, pdfLink, videoLink, photo, description } = req.body;
      const updatedLesson = await Lesson.findByIdAndUpdate(
        lessonId,
        {
          name,
          pdfLink,
          videoLink,
          photo,
          description,
        },
        { new: true }
      );
      if (!updatedLesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res
        .status(200)
        .json({ message: "Lesson Edited SuccessFully!!", updatedLesson });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  // Delete a lesson
  async deleteLesson(req, res) {
    try {
      const lessonId = req.params.id;
      const deletedLesson = await Lesson.findByIdAndRemove(lessonId);
      if (!deletedLesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.status(200).json({ message: "Lesson deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = LessonController;
