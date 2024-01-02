const Contact = require('../../database/model/contact');

let createContact = async(data) =>
{
    return await Contact.query().insert(data);
}

module.exports = {
    createContact : createContact,
}
