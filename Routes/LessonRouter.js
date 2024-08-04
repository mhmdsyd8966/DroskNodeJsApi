const express = require("express");
const LessonController = require("../Controllers/LessonController");

const router = express.Router();

const {
  authorizeRole,
  authenticateToken,
  checkBoughtPackage,
  checkTeacherOwner,
} = require("../Middleware/AuthMiddleware");

// Get all lessons by packageId
router.get(
  "/packages/:packageId/lessons",
  authenticateToken,
  checkBoughtPackage,
  LessonController.getLessonsByPackageId
);
router.get(
  "/packages/:packageId/lessonsForTeacher",
  authenticateToken,
  checkTeacherOwner,
  LessonController.getLessonsByPackageId
);

// Get lesson by ID
router.get(
  "/lessons/:id",
  authenticateToken,
  checkBoughtPackage,
  LessonController.getLessonById
);
router.get(
  "/lessonsForTeacher/:id",
  authenticateToken,
  checkTeacherOwner,
  LessonController.getLessonById
);

// Add a new lesson to a package
router.post(
  "/packages/:packageId",
  authenticateToken,
  authorizeRole(["teacher"]),
  checkTeacherOwner,
  LessonController.addLessonToPackage
);

// Update a lesson
router.put(
  "/lessons/:id",
  authenticateToken,
  authorizeRole,
  checkTeacherOwner,
  LessonController.updateLesson
);

// Delete a lesson
router.delete(
  "/lessons/:id",
  authenticateToken,
  authorizeRole,
  checkTeacherOwner,
  LessonController.deleteLesson
);

module.exports = router;
