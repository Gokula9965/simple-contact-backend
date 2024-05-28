const asyncHandler = require("express-async-handler");
const contactSchema = require("../schema/contactSchema");


const addContact = asyncHandler(async (req, res) => {
    const { name, emailId, phoneNumber } = req.body;
    if (!name || !emailId || !phoneNumber) {
        res.status(400)
        throw new Error("All fields name, emailId and phoneNumber are mandatory");
    }
    const newContact = await contactSchema.create({
        userId: req?.user?.user?.id,
        name,
        emailId,
        phoneNumber,
    });
    res.status(200).json({ msg: `new Contact created for the user ${req?.user?.user?.id}`, contactDetails: newContact });
});

const getAllContact = asyncHandler(async (req, res) => {
    const allConatact = await contactSchema.find();
    res.status(200).send(allConatact);
});
const getRespectiveContact = asyncHandler(async (req, res) => {
    const contactDetails = await contactSchema.findOne({ _id: req.params.id });
    if (contactDetails.userId.toString() !== req.user.user.id) {
        res.status(400)
        throw new Error("Can't have the access to another users data");
    }
    res.status(200).send(contactDetails);
});

const getUsersRespectiveContact = asyncHandler(async (req, res) => {
    const userContactDetails = await contactSchema.find({ userId: req?.user?.user?.id });
    res.status(200).send(userContactDetails);
});

const UpdateContact = asyncHandler(async (req, res) => {
    const contactDetail = await contactSchema.findOne({ _id: req.params.id });
    const data = req?.body;
    if (contactDetail && contactDetail?.userId?.toString() !== req.user.user.id) {
        res.status(400)
        throw new Error("don't have access to update the another users data");
    }
    data.updatedAt = Date.now();
    const updatedData = await contactSchema.updateOne({ _id: req.params.id }, {$set:data});
    res.status(200).send(updatedData);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contactDetail = await contactSchema.findOne({ _id: req.params.id });
    if (contactDetail && contactDetail?.userId?.toString() !== req.user.user.id) {
        res.status(400)
        throw new Error("don't have access to delete the another users data");
    }
    const deletedData = await contactSchema.deleteOne({ _id: req.params.id });
    res.status(200).send(deletedData);
})
module.exports = { addContact ,getAllContact,getRespectiveContact,getUsersRespectiveContact,UpdateContact,deleteContact};