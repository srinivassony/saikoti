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
   
    return res.json(await userService.UserLoginDetails(req.body))
});

app.get('/api/update/invite/user/:id', async (req, res) => {
   
    return res.json(await userService.InviteUser(req.params.id))
});

app.get('/api/resend/invite/user/:id', async (req, res) => {
   
    return res.json(await userService.reSendInviteUser(req.params.id))
});

app.get('/api/login/user', async(req, res) =>{

   return res.json(await userService.UserLoginDetails(req.body))
})

module.exports = app;