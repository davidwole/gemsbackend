const express = require("express");
const {
  getBranch,
  createBranch,
  updateBranch,
} = require("../controllers/branchController");
const { authMiddleware, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, authorize(["L1"]), getBranch);
router.post("/", authMiddleware, authorize(["L1"]), createBranch);
router.patch("/:id", authMiddleware, authorize(["L1"]), updateBranch);

module.exports = router;
