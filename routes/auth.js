const express = require('express');

const router = express.Router();

const {signUpController} = require('../controllers/signUpController');

const {signInController} = require('../controllers/signInController')


const {signUpValidator, signInValidator,validationResult} = require('../middleware/validator')

router.post('/signup', signUpValidator,validationResult,signUpController);

 router.post('/signin', signInValidator,validationResult,signInController);

module.exports = router;