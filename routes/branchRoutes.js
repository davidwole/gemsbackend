const express = require("express");
const {
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch,
} = require("../controllers/branchController");
const { authMiddleware, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, authorize(["L1", "L2"]), getBranch);
router.post("/", authMiddleware, authorize(["L1"]), createBranch);
router.patch("/:id", authMiddleware, authorize(["L1"]), updateBranch);
router.delete("/:id", authMiddleware, authorize(["L1"]), deleteBranch);

module.exports = router;
