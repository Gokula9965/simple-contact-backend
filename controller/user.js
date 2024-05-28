const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const userSchema = require("../schema/userSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const resgisterUser = asyncHandler(async (req, res) => {
    const { userName, emailId, password } = req?.body;
    if (!userName || !emailId || !password) {
        res.status(400)
        throw new Error("All fields userName, emailId,password are mandatory");
    }
    const userResponse = await userSchema.findOne({ emailId });
    if (userResponse) {
        res.status(400)
        throw new Error("User already exist");
    }
    const hashedPassword = await bcrypt?.hash(password, 10);
    const newUser = await userSchema?.create({
        userName,
        emailId,
        password: hashedPassword
    });
    res?.status(200)?.send({ msg: "user registerd successfully", user: newUser });
});

const loginUser = asyncHandler(async (req, res) => {
    const { emailId, password } = req?.body;
    if (!emailId || !password) {
        res?.status(400)
        throw new Error("All fields emailId and password are mandatory");
    }
    const userResponse = await userSchema.findOne({ emailId });
    if (userResponse && (await bcrypt.compare(password, userResponse.password))) {
        const accessToken = jwt.sign({
            user: {
                userName: userResponse.userName,
                emailId: userResponse.emailId,
                id: userResponse.id
            }
        }, process.env.ACCESS_TOKEN_SCERET, { expiresIn: "15m" });
        res.status(200).json({ accessToken });
    }
    else {
        res.status(400)
        throw new Error("Incorrect emailId or Password");
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { emailId, password } = req?.body;
    if (!emailId || !password) {
        res.status(400)
        throw new Error('All fields emailId and password mandatory');
    }
    const userResponse = await userSchema.findOne({ emailId });
    if (userResponse)
    {
        const hashesPassword = await bcrypt.hash(password, 10);
        await userSchema.updateOne({ _id: userResponse._id }, { $set: { password: hashesPassword, updatedAt: Date.now() } });
        res.status(200).send({ message: "Password updated sucessfully" });
    }
    else {
        res.status(401)
        throw new Error("User doesn't exist to reset the password");
    }
})

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).send(req.user);
})
module.exports = { resgisterUser, loginUser, resetPassword,currentUser};