const Branch = require("../models/Branch");

exports.getBranch = async (req, res) => {
  const branches = await Branch.find();
  res.status(200).json(branches);
};

exports.createBranch = async (req, res) => {
  const branch = new Branch(req.body);
  await branch.save();
  res.status(201).json(branch);
};

exports.updateBranch = async (req, res) => {
  const { id } = req.params;
  const branch = await Branch.findByIdAndUpdate(id, req.body, { new: true });
  res.json(branch);
};

exports.deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBranch = await Branch.findByIdAndDelete(id);
    res.send("Deleted");
  } catch (error) {
    res.json({ message: error.message });
  }
};
