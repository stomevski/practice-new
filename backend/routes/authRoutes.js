const express = require('express');
const { register, login, passwordReset } = require('../controllers/authController');
const { jwtMiddleware } = require('../middleware/jwtMiddleware');


const authRouter = express.Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.post('/resetPassword', jwtMiddleware, passwordReset);

module.exports = authRouter;