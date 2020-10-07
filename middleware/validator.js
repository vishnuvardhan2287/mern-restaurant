const {check,validationResult}  = require('express-validator');

exports.signUpValidator = [
    check('userName').not().isEmpty().trim().withMessage('All Fields Required'),
    check('email').isEmail().normalizeEmail().withMessage('Invalid Email'),
    check('password').isLength({min:6}).withMessage('Password should be atleast 6 characters long')
]

exports.validationResult = (req,res,next) =>{
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if(hasErrors){
        const firstError = result.array()[0].msg;
        return res.status(400).json({
            errorMessage: firstError
        })
    }

    next();
}