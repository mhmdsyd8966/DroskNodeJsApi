const jwt = require("jsonwebtoken");
const Transaction = require("../Models/Transaction");
const Package = require("../Models/Package");
const api_config = require("../Config/jwtSecret");
const mongoose = require("mongoose");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "Access token is required" });

  jwt.verify(token, api_config.jwtSecret.jwt_secret, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid access token" });
    req.user = user;
    next();
  });
}

function authorizeRole(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });

    next();
  };
}

async function checkBoughtPackage(req, res, next) {
  const packageId = req.params.packageId;

  try {
    const package = await Package.findById(packageId);
    const transaction = await Transaction.findOne({
      packageId: packageId,
      userId: req.user.userId,
    });

    if (req.user.role == "user" && transaction.userId == req.user.userId) {
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function checkTeacherOwner(req, res, next) {
  const packageId = req.params.packageId;
  console.log(packageId);
  if (!packageId)
    return res.status(404).json({ message: "packageId can't be null" });
  try {
    const package = await Package.findById(packageId);

    if (!package) {
      return res.status(404).json({ message: "Package not found", packageId });
    }
    console.log(req.user.userId);
    console.log(package.teacherId.toString());
    if (package.teacherId.toString() !== req.user.userId)
      return res
        .status(403)
        .json({ message: "You are not the owner of this package" });

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  authenticateToken,
  authorizeRole,
  checkBoughtPackage,
  checkTeacherOwner,
};
