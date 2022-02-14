const express = require('express');
const { register, login, passwordReset, refreshToken, logout } = require('../controllers/authController');
const { jwtMiddleware } = require('../middleware/jwtMiddleware');


const authRouter = express.Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.patch('/resetPassword', jwtMiddleware, passwordReset);

authRouter.post('/refreshToken', refreshToken);

authRouter.post("/logout", logout);

module.exports = authRouter;