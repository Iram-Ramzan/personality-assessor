const { body, validationResult } = require("express-validator");

const validateSignup = [
  body("name").trim().notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateLogin = [
  body("email").isEmail(),
  body("password").notEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateSignup,
  validateLogin
};
