
const config = require("../../../config");
// const logger = require("../../services/logging");

const { database } = require("../../api/dbConnection"); 

const rdsSqlConfig = config.rdsSql;

console.log("info", "RDS DB config for common mddleware", rdsSqlConfig);

const knex = database.getConnection({
    awsRegion: rdsSqlConfig.region,
    rdsSecretName: rdsSqlConfig.secretArn,
    minPool: rdsSqlConfig.pool.min,
    maxPool: rdsSqlConfig.pool.max
});

module.exports = knex;