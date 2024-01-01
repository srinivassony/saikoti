const config = require('../../../config');

const tables = {
    user: 'sk_user',
    contact: 'sk_contact'
};

const rdsPrefix = config.rdsSql.owner;
const dbServer = config.dbServer || "COMMON";

if (rdsPrefix && dbServer === "COMMON")
{
    Object.keys(tables).forEach((key) =>
    {
        tables[key] = `${rdsPrefix}${tables[key]}`;
    });
}

module.exports = tables;
