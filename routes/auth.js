const express = require('express');
const router = express.Router();

const authController =  require('../controller/AuthController');
const authValidation = require('../validation/authValidation');
const validationMiddleware = require('../middleware/validationMiddleware');

router.post('/sign-up',authValidation.signUpValidation,validationMiddleware.signUp,authController.signUp);
router.post('/sign-in', authValidation.signInValidation,validationMiddleware.signUp, authController.signIn)
module.exports = router;