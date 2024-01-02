const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('./table');

class Contact extends guid(Model)
{
    static get tableName()
    {
        return `${tables.contact}`;
    }
}

module.exports = Contact;