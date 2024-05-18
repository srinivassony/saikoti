const express = require('express');
const cors = require('cors');
let app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require("body-parser");
let userService = require('../service/user');
let userDb = require('../database/db/user');
let contactService = require('../service/contact');
let countryService = require('../service/country');

//middelwares
app.use(flash());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true,  limit: '50mb' }));
app.set('views', path.join(__dirname, '../../views'))
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '../../views')));
app.use(cors());
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

app.get('/dashboard',  (req, res) =>
{
	var name = req.session.name;
	var id = req.session.userId;
	var uuid = req.session.uuid;
	var countInfo = req.session.count;

	if (!req.session.isLoggedIn)
	{
		return res.redirect('/');
	}

	res.render('pages/dashboard', {
		isAuthenticated: req.session.isLoggedIn,
		username: name,
		id: id,
		uuid: uuid,
		countInfo: countInfo
	});
});

app.get('/dashboardInfo',  (req, res) =>
{
	var name = req.session.name;
	var id = req.session.userId;
	var uuid = req.session.uuid;
	var countInfo = req.session.count;

	if (!req.session.isLoggedIn)
	{
		return res.redirect('/');
	}

	res.render('pages/dashboard', {
		isAuthenticated: req.session.isLoggedIn,
		username: name,
		id: id,
		uuid: uuid,
		countInfo: countInfo
	});
});

app.get('/about-us',  async(req, res) =>
{
	res.render('pages/about-us',{
		isAuthenticated: req.session.isLoggedIn ? true : false
	});
});

app.get('/FAQs',  async(req, res) =>
{
	res.render('pages/faqs',{
		isAuthenticated: req.session.isLoggedIn ? true : false
	});
});

app.get('/myAccount',  async(req, res) =>
{
	var id = req.session.userId;
	var uuid = req.session.uuid;

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

	if (!req.session.isLoggedIn)
	{
		return res.redirect('/');
	}

	res.render('pages/myAccount',{
		isAuthenticated: req.session.isLoggedIn ? true : false,
		id: id,
		uuid:uuid,
		errorMessage: message,
		sucessMessage: message1
	});
});

app.get('/contact-info',  async(req, res) =>
{
	let message = req.flash('error');

	if (message.length > 0)
	{
		message = message[0];
	} 
	else
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

	res.render('pages/contact',{
		isAuthenticated: req.session.isLoggedIn ? true : false,
		errorMessage: message,
		sucessMessage: message1
	});
});

app.post('/api/login/user', userService.userLogin);

app.post('/api/register/user', userService.createUser);

app.post('/api/resend/invite/user', userService.reSendInviteUser);

app.get('/api/update/invite/user/:id', userService.InviteUser);

app.post('/api/reset/password', userService.resetPassword);

app.post('/api/change/password', userService.changePassword);

app.post('/api/update/user', userService.updateUser);

app.post('/logout', async function (req, res)
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

app.post('/api/add/count',async (req, res) =>
{
	let result =  res.json(await userService.addCount(req.body));

	return result;
})

app.post('/api/add/contact',contactService.createContact);

app.get('/api/countries',async (req, res) =>
{
	let result =  res.json(await countryService.getCountries());

	return result;
});

app.post('/api/states', async (req, res) =>
{
	let result = res.json(await countryService.getStatesByCountryId(req.body));

	return result;
});

app.get('/api/delete/country', async(req, res) =>
{
   return res.json(await countryService.deleteCountry())
})

app.post('/api/fetchCount',async (req, res) =>
{
	let result =  res.json(await userService.getCount(req.body));

	return result;
})

app.post('/api/user/id',async (req, res) =>
{
	let result =  res.json(await userService.getUserById(req.body));

	return result;
})

module.exports = app;