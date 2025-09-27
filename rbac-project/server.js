const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const User = require("./models/user");

// Routes
const authRoutes = require("./routes/auth");
const recordsRoutes = require("./routes/records");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  session({ secret: "secretkey", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport config
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// DB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/rbacdb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/auth", authRoutes);
app.use("/records", recordsRoutes);

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Hello, RBAC World!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('http://localhost:4000');
    
});
