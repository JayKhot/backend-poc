const { check } = require('express-validator')
exports.signUpValidation = [
    check("name")
      .isLength({ min: 3 })
      .withMessage("the name must have minimum length of 3")
      .trim(),

    check("email")
      .isEmail()
      .withMessage("invalid email address")
      .normalizeEmail(),

    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/[a-z]/)
      .withMessage("your password should have at least one string")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one sepcial character"),

    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        //console.log(req.body.password, req.body.confirmPassword);
        throw new Error("confirm password does not match");
      }
      return true;
    }),
];