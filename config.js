require('dotenv').config();

const config = require("./config.json");

const environment = 'development';
const environmentConfig = config[environment];



let poolMin = environmentConfig.SQL.POOL.MIN || 0;
let poolMax = environmentConfig.SQL.POOL.MAX || 3;

module.exports = {

    app_name: environmentConfig.APP_NAME || 'saikoti-user-service',
    server_port: config.development.SERVER_PORT,

    sql: {
        client: process.env.SQL_DB_CLIENT || environmentConfig.SQL.CLIENT || 'oracledb',
        host: process.env.SQL_DB_HOST || environmentConfig.SQL.HOST,
        user: process.env.SQL_DB_USER || environmentConfig.SQL.USER,
        paswd:  process.env.SQL_DB_PASWD || environmentConfig.SQL.PASWD,
        database: process.env.SQL_DB_DATABASE || environmentConfig.SQL.DATABASE,
        owner: process.env.ORACLE_TABLE_PREFIX || environmentConfig.SQL.OWNER || null,
        connectString:  process.env.ORACLE_CONNECTION || environmentConfig.SQL.CONNECT_STRING,
        pool: {
            min: Number(poolMin),
            max: Number(poolMax)
        }, 
        connectionTimeout: process.env.SQL_DB_CONNECTION_TIMEOUT || environmentConfig.SQL.CONNECTION_TIMEOUT
    },
    dbServer: process.env.DEPLOY_TO || "COMMON",
    awsProxy: process.env.AWS_PROXY || null,
    rdsSql: {
        client: process.env.SQL_DB_CLIENT || environmentConfig.SQL.CLIENT || "oracledb",

        region: process.env.RDS_SQL_DB_REGION || null,
        secretArn: process.env.RDS_SQL_DB_SECRET_ARN || null,

        paswdExpiry: process.env.RDS_SQL_DB_PASSWORD_EXPIRY_DAYS || 29,

        owner: process.env.RDS_ORACLE_TABLE_PREFIX || null,
        pool: {
            min: Number(poolMin),
            max: Number(poolMax)
        }
    },

}
   

