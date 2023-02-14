const userRepo = require("../../repositories/users.js");
const express = require("express");
const { check, validationResult } = require("express-validator");
const signUpTemplate = require("../../views/admin/auth/signup.js");
const signInTemplate = require("../../views/admin/auth/signin.js");
const {
  requirePassword,
  requireEmail,
  requireConfirmPassword,
  requireValidEmail,
  requireValidPassword,
} = require("./validator.js");
const { handleErrors } = require("./middlewares.js");
const router = express.Router();

// Signup route
router.get("/signup", (req, res) => {
  res.send(signUpTemplate({ req }));
});

// Collecting data from signup route
router.post(
  "/signup",
  [requireEmail, requirePassword, requireConfirmPassword],
  handleErrors(signUpTemplate),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await userRepo.create({ email, password });
    req.session.userId = user.id;
    res.redirect("/signin");
  }
);

// Signout route
router.get("/signout", (req, res) => {
  req.session = null;
  res.send("you are signed out");
});

//sign in route to get user sign in
router.get("/signin", (req, res) => {
  res.send(signInTemplate({}));
});

// handling info entered by user in signin
router.post(
  "/signin",
  [requireValidEmail, requireValidPassword],
  handleErrors(signInTemplate),
  async (req, res) => {
    const { email } = req.body;
    const user = await userRepo.getOneBy({ email });

    req.session.userId = user.id;
    res.redirect("/admin/products");
  }
);

module.exports = router;
