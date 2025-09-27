const User = require("../models/user");

// Register a new user
exports.registerUser = (req, res) => {
  const { username, password, role } = req.body;
  const user = new User({ username, role });

  User.register(user, password, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User registered successfully" });
  });
};

// Login user
exports.loginUser = (req, res) => {
  res.json({ message: "Login successful", user: req.user });
};

// Logout
exports.logoutUser = (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
};
