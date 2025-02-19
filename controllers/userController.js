const User = require("../models/User");

exports.getUsers = async (req, res) => {
  const users = await User.find().populate("branch");
  res.json(users);
};

exports.updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await User.findByIdAndUpdate(id, { status });
  res.json({ message: "User status updated" });
};
