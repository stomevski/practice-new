const UserAuthModel = require('../schema/userAuthSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validateFunction, userAuthRule, userLoginRule, userChangePasswordRule } = require('../validation/userAuthValidation');
const STATUS_CODE = require('../util/errorStatusCodes');

exports.register = async (req, res) => {

    try {

        await validateFunction(req.body, userAuthRule);

        const isEmailUnique = await UserAuthModel.findOne({ email: req.body.email });

        if (isEmailUnique) {
            return res.status(STATUS_CODE.BAD_REQUEST).json({ message: "Email already used" });
        }



        const userCreated = await UserAuthModel.create(req.body);

        // const token = jwt.sign({ id: userCreated._id }, process.env.SECRET_KEY);


        // res.status(STATUS_CODE.CREATED).json(token);

        res.status(STATUS_CODE.CREATED).json({ message: "User successfully created" });

    } catch (err) {

        res.status(STATUS_CODE.BAD_REQUEST).json(err);
    }



}





exports.login = async (req, res) => {

    try {

        await validateFunction(req.body, userLoginRule);

        const findUser = await UserAuthModel.findOne({ email: req.body.email });

        if (!findUser) {
            return res.status(STATUS_CODE.BAD_REQUEST).json({ message: "Email or password incorrect" });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, findUser.password);

        if (!passwordMatch) {
            return res.status(STATUS_CODE.BAD_REQUEST).json({ message: "Email or password incorrect" });
        }

        const token = jwt.sign({ id: findUser._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        const refreshToken = jwt.sign({ id: findUser._id }, process.env.REFRESH_KEY, { expiresIn: "1y" });

        findUser.refreshTokens.push(refreshToken);

        await findUser.save();

        res.status(STATUS_CODE.OK).json({ token, refreshToken, username: findUser.username });

    } catch (err) {

        res.status(STATUS_CODE.BAD_REQUEST).json(err);

    }





}



exports.passwordReset = async (req, res) => {

    try {

        await validateFunction(req.body, userChangePasswordRule);

        const findUser = await UserAuthModel.findOne({ _id: req.user.id });


        const passwordMatch = await bcrypt.compare(req.body.password, findUser.password);


        if (!passwordMatch) {
            return res.status(STATUS_CODE.BAD_REQUEST).json({ message: "Passwords dont match" });
        }

        findUser.password = req.body.newPassword;

        await findUser.save();

        res.status(STATUS_CODE.OK).json({ message: "Password Updated" });

    } catch (err) {

        res.status(STATUS_CODE.BAD_REQUEST).json(err);

    }



}



exports.refreshToken = async (req, res) => {

    const { token } = req.body;

    try {

        if (!token) {
            return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Unauthorized" });
        }

        const validateRefreshToken = jwt.verify(token, process.env.REFRESH_KEY);

        const fetchUser = await UserAuthModel.findById(validateRefreshToken.id);



        if (!fetchUser || !fetchUser.refreshTokens.includes(token)) {

            return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Unauthorized" });
        }

        fetchUser.refreshTokens = fetchUser.refreshTokens.filter((tok) => tok !== token);


        const newAccessToken = jwt.sign({ id: fetchUser._id }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });

        const newRefreshToken = jwt.sign({ id: fetchUser._id }, process.env.REFRESH_KEY, { expiresIn: "1y" });

        fetchUser.refreshTokens.push(newRefreshToken);

        await fetchUser.save();

        res.status(STATUS_CODE.OK).json({ token: newAccessToken, refreshToken: newRefreshToken, username: fetchUser.username });

    } catch (err) {

        res.status(STATUS_CODE.UNAUTHORIZED).send({ message: "Unauthorized" });

    }


}



exports.logout = async (req, res) => {

    const { token } = req.body;

    try {

        if (!token) {
            return res.status(STATUS_CODE.BAD_REQUEST).json("noToken");
        }

        const validateRefreshToken = jwt.verify(token, process.env.REFRESH_KEY);

        console.log(validateRefreshToken);
        const fetchUser = await UserAuthModel.findById(validateRefreshToken.id);


        if (fetchUser.refreshTokens.includes(token)) {


            fetchUser.refreshTokens = fetchUser.refreshTokens.filter((tok) => tok !== token);

            await fetchUser.save();

            return res.status(STATUS_CODE.OK).json("OK");

        } else {

            return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Unauthorized" });

        }


    } catch (err) {
        res.status(STATUS_CODE.UNAUTHORIZED).json("catch");
    }


}