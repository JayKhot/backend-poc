const express = require('express');
const router = express.Router();

const authController =  require('../controller/AuthController');
const authValidation = require('../validation/authValidation');
const validationMiddleware = require('../middleware/validationMiddleware');

router.post('/sign-up',authValidation.signUpValidation,validationMiddleware.signUp,authController.signUp);
module.exports = router;