const express = require('express');
let app = express();
const config = require ('../../config');
const validationHandler = require('../validations/validation_handler');
const UserValidator = require('../validations/user');

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true,  limit: '50mb' }));

let userService = require('../service/user');

app.post('/api/create/user', UserValidator.add(), validationHandler, async (req, res) => {
   
    return res.json(await userService.createUser(req.body))
})

app.post('/api/signin', async (req, res) => {
   
    return res.json(await userService.UserSignInAccount(req.body))
});

module.exports = app;