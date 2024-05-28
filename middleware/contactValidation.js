const joi = require("joi");
const asyncHandler = require("express-async-handler");

const addContactValidation = asyncHandler(async (req, res, next) => {
    const addContactSchema = joi.object({
        name: joi.string().required(),
        emailId: joi.string().email().required(),
        phoneNumber: joi.string().required()
    });
    const { error } = addContactSchema.validate(req?.body);
    if (error) {
        res.status(400)
        throw new Error( error.details[0].message);
    }
    next();
});

module.exports = addContactValidation;