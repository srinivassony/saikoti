
const config = require('../../config');

const getConnection = (options = {}) =>
{
    const client = process.env.SQL_DB_CLIENT || "oracledb";
    const connectString = process.env.ORACLE_CONNECTION;
    const user = process.env.SQL_DB_USER;
    const password = process.env.SQL_DB_PASWD;

    const minPool = options.minPool;
    const maxPool = options.maxPool;

    const awsRegion = options.awsRegion;
    const rdsSecretName = options.rdsSecretName;

    const knex = require('knex')({
        client: client,
        connection: {
            connectString: connectString,
            user: user,
            password: password
        },
        pool: {
            min: Number(minPool),
            max: Number(maxPool)
        }
    });

    return knex;
};


module.exports = {
   
    database: {
        getConnection
    }
}