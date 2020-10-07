const express = require('express');

const router = express.Router();

const {signUpValidator, validationResult} = require('../middleware/validator')

router.post('/signup', signUpValidator,validationResult)

module.exports = router;