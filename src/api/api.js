const express = require('express');
let app = express();
const config = require ('../../config');

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true,  limit: '50mb' }));

let userService = require('../service/user');

app.post('/api/create/user', async(req,res) =>{
 return res.json (await userService.createUser(req.body))
})

module.exports = app;