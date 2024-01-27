const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('./table');

class Count extends guid(Model)
{
    static get tableName()
    {
        return `${tables.count}`;
    }
}

module.exports = Count;