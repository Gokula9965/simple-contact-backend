const joi = require("joi");

const registerValidation = async (req, res, next) => {
    const registerSchema = joi.object({
        userName: joi.string().required(),
        emailId: joi.string().email().required(),
        password: joi.string().required()
    });
    const { error } = registerSchema.validate(req?.body);
    if (error)
    {
        return res.status(400).send({ message: error.details[0].message });    
    }
    next();
}

const loginValidation = async (req, res, next) => {
    const loginSchema = joi.object({
        emailId: joi.string().email().required(),
        password: joi.string().required()
    });
    const { error } = loginSchema.validate(req?.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    next();
};

module.exports = { registerValidation, loginValidation };