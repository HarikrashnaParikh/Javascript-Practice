const { check } = require("express-validator");
const userRepo = require("../../repositories/users.js");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email addres")
    .custom(async (email) => {
      const existingUser = await userRepo.getOneBy({ email });
      if (email === existingUser) {
        throw new Error("User already exists");
      }
    }),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("minimum of 8 characters required"),
  requireConfirmPassword: check("confirmPassword")
    .trim()
    .isLength({ min: 8 })
    .withMessage("minimum of 8 characters required")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Password and Confirm Password must be same");
      }
      return true;
    }),
  requireValidEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email not valid")
    .custom(async (email) => {
      const user = await userRepo.getOneBy({ email });
      if (!user) {
        throw new Error("User not found");
      }
    }),
  requireValidPassword: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await userRepo.getOneBy({ email: req.body.email });
      if (!user) {
        throw new Error("Invalid Password");
      }
      const validPassword = await userRepo.hashComparator(
        user.password,
        password
      );
      if (!validPassword) {
        throw new Error("Invalid Password");
      }
    }),
  requireTitle: check("title")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Must be within 3 to 20 characters"),
  requirePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage("minimum price of $1 allowed"),
};
