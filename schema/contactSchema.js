const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "userData"
    },
    name: {
        type: String,
        required: true,
        trime: true
    },
    emailId: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
});

module.exports = mongoose.model("Contact", contactSchema);