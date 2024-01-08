const express = require('express');
let app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require("body-parser");
let userService = require('../service/user');
let userDb = require('../database/db/user');
let contactService = require('../service/contact');

//middelwares
app.use(flash());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true,  limit: '50mb' }));
app.set('views', path.join(__dirname, '../../views'))
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '../../views')));

app.use(session({
    key:'session',
    secret: 'session_cookie_secret',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 6000000}
}));

app.get('/', async (req, res) =>
{
	let users = await userDb.getUserDetails();

	res.render('pages/index', {
		isAuthenticated: false,
		users : users.length
	});
});

app.get('/register', async (req, res) =>
{
	let message = req.flash('error');
	if (message.length > 0)
	{
		message = message[0];
	} else
	{
		message = null;
	}

	res.render('pages/register', {
		isAuthenticated: false,
		errorMessage: message
	});
});

app.get('/login',  (req, res) =>
{
	let message = req.flash('error');
	if (message.length > 0)
	{
		message = message[0];
	} else
	{
		message = null;
	}

	let message1 = req.flash('success');
	if (message1.length > 0)
	{
		message1 = message1[0];
	} 
	else
	{
		message1 = null;
	}

	res.render('pages/login',{
		isAuthenticated: false,
		errorMessage: message,
		sucessMessage: message1
	});
});

app.get('/error-login',  (req, res) =>
{
	let message = req.flash('error');
	if (message.length > 0)
	{
		message = message[0];
	} else
	{
		message = null;
	}

	res.render('pages/login',{
		isAuthenticated: false,
		errorMessage: message
	});
});

app.get('/dashboard',  (req, res) =>
{
	var name = req.session.name;
	var id = req.session.id;

	if (!req.session.isLoggedIn)
	{
		return res.redirect('/');
	}

	res.render('pages/dashboard', {
		isAuthenticated: req.session.isLoggedIn,
		username: name,
		id: id
	});
});

app.get('/active-account',  (req, res) =>
{
	let message = req.flash('error');
	if (message.length > 0)
	{
		message = message[0];
	} else
	{
		message = null;
	}

	let message1 = req.flash('success');
	if (message1.length > 0)
	{
		message1 = message1[0];
	} 
	else
	{
		message1 = null;
	}

	res.render('pages/active-account', {
		isAuthenticated: false,
		errorMessage: message,
		sucessMessage: message1
	});
});

app.get('/reset-password',  (req, res) =>
{
	let message = req.flash('error');
	if (message.length > 0)
	{
		message = message[0];
	} else
	{
		message = null;
	}

	let message1 = req.flash('success');
	if (message1.length > 0)
	{
		message1 = message1[0];
	} 
	else
	{
		message1 = null;
	}

	res.render('pages/reset-password',{
		isAuthenticated: false,
		errorMessage: message,
		sucessMessage: message1
	});
});

app.get('/change-password',  async(req, res) =>
{
	let message = req.flash('error');
	if (message.length > 0)
	{
		message = message[0];
	} else
	{
		message = null;
	}

	res.render('pages/change-password',{
		isAuthenticated: false,
		errorMessage: message
	});
});

app.get('/about-us',  async(req, res) =>
{
	res.render('pages/about-us',{
		isAuthenticated: false
	});
});

app.get('/FAQs',  async(req, res) =>
{
	res.render('pages/faqs',{
		isAuthenticated: false
	});
});

app.get('/contact-info',  async(req, res) =>
{
	res.render('pages/contact',{
		isAuthenticated: false
	});
});

app.post('/api/login/user', userService.userLogin);

app.post('/api/register/user', userService.createUser);

app.post('/api/resend/invite/user', userService.reSendInviteUser);

app.get('/api/update/invite/user/:id', userService.InviteUser);

app.post('/api/reset/password', userService.resetPassword);

app.post('/api/change/password', userService.changePassword);

app.post('/logout', function (req, res)
{
	req.session.destroy(function (err)
	{
		if (err)
		{
			req.flash('error', err);

            res.redirect('/error-login');
		} 
		else
		{
			res.redirect('/')
		}
	});
});

module.exports = app;