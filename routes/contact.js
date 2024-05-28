const express = require("express");
const validateToken = require("../middleware/validateToken");
const { addContact ,getAllContact, getRespectiveContact, getUsersRespectiveContact, UpdateContact, deleteContact} = require("../controller/contact");
const addContactValidation = require("../middleware/contactValidation");
const contact = express.Router();

contact.post('/add',validateToken,addContactValidation,addContact);
contact.get('/', getAllContact);
contact.get('/getUserContact',validateToken,getUsersRespectiveContact)
contact.get('/:id', validateToken, getRespectiveContact);
contact.patch('/:id',validateToken,UpdateContact);
contact.delete('/:id',validateToken,deleteContact);

module.exports = contact;