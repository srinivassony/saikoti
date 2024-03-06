const app = require('./src/api/api');
const config = require('./config');

process.on('uncaughtException', (error, origin) =>
{
    console.log('error', error)
})

app.listen(config.server_port);

console.log('output');