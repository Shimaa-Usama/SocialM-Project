const { check } = require('express-validator')
module.exports = [check('fname').matches(/([a-zA-Z]{3,30}\s*)+/),
                    check('lname').matches(/([a-zA-Z]{3,30}\s*)+/), 
                    check('uname').matches(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/),
                    check('email').isEmail(),
                    check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),

]