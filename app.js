const app = require('./src/api/api');
const config = require('./config');
app.listen(config.server_port);

console.log('output');