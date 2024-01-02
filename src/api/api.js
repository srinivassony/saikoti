const express = require('express');
let app = express();
const config = require ('../../config');
const validationHandler = require('../validations/validation_handler');
const UserValidator = require('../validations/user');
const ContactValidator = require('../validations/contact');
const Authentication = require('../service/authentication');
const common = require('../utills/utils');
const userType = common.userType;
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true,  limit: '50mb' }));

let userService = require('../service/user');
let contactService = require('../service/contact');

app.post('/api/create/user', UserValidator.add(), validationHandler, async (req, res) => {
   
    return res.json(await userService.createUser(req.body))
})

app.get('/api/update/invite/user/:id',  UserValidator.getId(), validationHandler, async (req, res) => {
   
    return res.json(await userService.InviteUser(req.params.id))
});

app.get('/api/resend/invite/user/:id', UserValidator.getId(), validationHandler, async (req, res) => {
   
    return res.json(await userService.reSendInviteUser(req.params.id))
});

app.post('/api/login/user', UserValidator.addLogin(), validationHandler,  async(req, res) =>{

   return res.json(await userService.UserLoginDetails(req.body))
})

app.post('/api/reset/password', UserValidator.resetPassword(), validationHandler,  async(req, res) =>{

   return res.json(await userService.ResetPassword(req.body))
})

let myInit = async (req, res, next) => 
{
	try
	{

		let skRole = req.headers['role'];
		let skToken = req.headers['sktoken'];

		if (!skToken)
		{
			return res.json({
				status: 0,
				message: "Authorization is required."
			});
		}
		else if (skToken)
		{
			await Authentication.validateToken(skToken, async function (tokenResult) 
			{
				if (tokenResult.status == 1)
				{
					let tokenUser = tokenResult.user;
					
					
					let newToken = await Authentication.generateToken(tokenUser);

					if (newToken)
					{
						res.append('newtoken', newToken);

						req.tokens = {
							...req.tokens,
							sktoken: newToken,
							role: skRole
						};
					}

					req.skUser = tokenUser;
					req.authId = tokenUser.uuid || null;

					let userRole = req.skUser.role;

					if(userRole.search(skRole) < 0)
					{
						return res.json({
							status: 0,
							message: "Authorization failed: Do not have access for this API"
						});
					}

					next();
				}
				else if (tokenResult.status == 0)
				{
					return res.json(tokenResult);
				}
			});
		}
	}
	catch (error)
	{
	
		return res.json({
			status: 0,
			message: error.message,
		});
	}
};

app.use(myInit);

app.post('/api/create/contact', Authentication.authorize([userType.USER]), ContactValidator.add(), validationHandler, async(req, res) => {

    return res.json(await contactService.createContact(req.body, req.skUser))
})

module.exports = app;