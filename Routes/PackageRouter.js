const express = require("express");
const router = express.Router();
const PackageController = require("../Controllers/PackageController");
const {
  authorizeRole,
  authenticateToken,
  checkBoughtPackage,
  checkTeacherOwner,
} = require("../Middleware/AuthMiddleware");

// Get all packages route
router.get("/", authenticateToken, PackageController.getAllPackages);

// Get package by ID route
router.get(
  "/:id",
  authenticateToken,
  authorizeRole(["teacher"]),
  PackageController.getPackageById
);

// Create package route
router.post(
  "/",
  authenticateToken,
  authorizeRole(["teacher"]),
  PackageController.createPackage
);

// Delete package route
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["teacher"]),
  checkTeacherOwner,
  PackageController.deletePackage
);

// Update package route
router.put(
  "/:id",
  authenticateToken,
  authorizeRole(["teacher"]),
  checkTeacherOwner,
  PackageController.updatePackage
);

// Get all packages by teacher ID route
router.get("/teacher/:id", PackageController.GetAllPackagesByTeacherId);

module.exports = router;
