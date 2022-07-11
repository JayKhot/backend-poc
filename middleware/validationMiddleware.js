const { validationResult } = require('express-validator');
exports.signUp = (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    const hasError = !error.isEmpty();

    if (hasError) {
       // console.log(error.mapped())
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  }