const express = require("express");
const { resgisterUser, loginUser, resetPassword, currentUser } = require("../controller/user");
const { registerValidation, loginValidation } = require("../middleware/userValidation");
const validateToken = require("../middleware/validateToken");
const userRouter = express.Router();

userRouter.post('/register',registerValidation,resgisterUser);
userRouter.post('/login',loginValidation,loginUser);
userRouter.post('/reset-password',loginValidation,resetPassword);
userRouter.get('/currentUser',validateToken,currentUser);

module.exports = userRouter;