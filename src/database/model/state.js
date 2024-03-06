const { Model } = require("../db/db-config");
const guid = require('objection-guid')();
const tables = require('./table');

class State extends guid(Model)
{
    static get tableName()
    {
        return `${tables.state}`;
    }
}

module.exports = State;