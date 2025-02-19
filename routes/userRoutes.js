const express = require("express");
const { getUsers, updateUserStatus } = require("../controllers/userController");
const { authMiddleware, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, authorize(["L1"]), getUsers);
router.patch("/:id", authMiddleware, authorize(["L1"]), updateUserStatus);

module.exports = router;
