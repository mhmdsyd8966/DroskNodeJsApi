const Transaction = require("../Models/Transaction");

const express = require("express");
const router = express.Router();

const createTransaction = require("../Controllers/TransactionController");

const {
  authorizeRole,
  authenticateToken,
} = require("../Middleware/AuthMiddleware");

router.post(
  "/:id",
  authenticateToken,
  authorizeRole(["user"]),
  createTransaction
);

module.exports = router;
