const UserAuthModel = require('../schema/userAuthSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validateFunction, userAuthRule, userLoginRule, userChangePasswordRule } = require('../validation/userAuthValidation');
const STATUS_CODE = require('../util/errorStatusCodes');

exports.register = async (req, res) => {

    try {

        await validateFunction(req.body, userAuthRule);

        const isEmailUnique = await UserAuthModel.findOne({ email: req.body.email });

        if (isEmailUnique) {
            return res.status(STATUS_CODE.BAD_REQUEST).send({ email: { message: "Email already used" } })
        }



        const userCreated = await UserAuthModel.create(req.body);

        const token = jwt.sign({ id: userCreated._id }, process.env.SECRET_KEY);


        res.status(STATUS_CODE.CREATED).send(token);

    } catch (err) {

        res.status(STATUS_CODE.BAD_REQUEST).send(err);
    }



}





exports.login = async (req, res) => {

    try {

        await validateFunction(req.body, userLoginRule);

        const findUser = await UserAuthModel.findOne({ email: req.body.email });

        if (!findUser) {
            return res.status(STATUS_CODE.BAD_REQUEST).send({ message: "Email or password incorrect" });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, findUser.password);

        if (!passwordMatch) {
            return res.status(STATUS_CODE.BAD_REQUEST).send({ message: "Email or password incorrect" });
        }

        const token = jwt.sign({ id: findUser._id }, process.env.SECRET_KEY);

        res.status(STATUS_CODE.OK).send(token);

    } catch (err) {

        res.status(STATUS_CODE.BAD_REQUEST).send(err);

    }





}



exports.passwordReset = async (req, res) => {

    try {

        await validateFunction(req.body, userChangePasswordRule);

        const findUser = await UserAuthModel.findOne({ _id: req.user.id });

        const passwordMatch = await bcrypt.compare(req.body.password, findUser.password);

        if (!passwordMatch) {
            return res.status(STATUS_CODE.BAD_REQUEST).send({ message: "Passwords dont match" });
        }

        findUser.password = req.body.newPassword;

        await findUser.save();

        res.status(STATUS_CODE.OK).send({ message: "Password Updated" });

    } catch (err) {

        res.status(STATUS_CODE.BAD_REQUEST).send(err);

    }



}