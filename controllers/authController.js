const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, branch } = req.body;

    if (role !== "L1" && !branch)
      return res
        .status(400)
        .json({ message: "Branch is required for non-L1 users" });

    const user = new User({ name, email, password, role, branch });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid crdentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ name: user.name, email: user.email, role: user.role, token });
  } catch (error) {
    res.status(500).json({ message: "Login error", error });
  }
};
