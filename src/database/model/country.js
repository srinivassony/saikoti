const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('./table');

class Country extends guid(Model)
{
    static get tableName()
    {
        return `${tables.country}`;
    }
}

module.exports = Country;