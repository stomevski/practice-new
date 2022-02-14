const { Validator } = require('node-input-validator');



exports.validateFunction = async (data, rule) => {

    const validate = new Validator(data, rule);

    const match = await validate.check()
    if (!match) {
        throw validate.errors;
    }

}




exports.userAuthRule = {
    username: 'required|string|alphaNumeric|length:30,3',
    email: 'required|email',
    password: 'required|string|alphaNumeric|length:30,5'
}



exports.userLoginRule = {
    email: 'required|email',
    password: 'required|string|alphaNumeric|length:30,5'
}



exports.userChangePasswordRule = {
    password: 'required|string|alphaNumeric|length:30,5',
    newPassword: 'required|string|alphaNumeric|length:30,5'
}


