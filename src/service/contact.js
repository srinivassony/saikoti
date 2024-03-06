const db = require('../database/db/contact');
const common = require('../utills/utils');
const Status = common.Status;
const htmlTemplate = require('../utills/htmlTemplate');
const smtp = require('../service/smtp');
const config = require('../../config');


exports.createContact = async (req, res) => 
{
  try 
  {
    let reqParams = req.body;
    let name = reqParams.name ? reqParams.name : null;
    let email = reqParams.emailInfo ? reqParams.emailInfo : null;
    let message = reqParams.message ? reqParams.message : null;

    let params = {
      name: name,
      email: email,
      message: message,
      createdAt: new Date()
    }

    let userContact = await db.createContact(params);

    if (!userContact)
    {
      req.flash('error', 'User login failed. Try to activate your account');

      res.redirect('/contact-info');

      return "";
    }

    try
    {
      var htmlData = {
        name: userContact.name ? userContact.name : '',
        email: userContact.email ? userContact.email : '',
        message: userContact.message ? userContact.message : ''
      };

      let emailSubject = `Thank You for Contacting Us!`;
      let emailBody = htmlTemplate.generateContactUs(htmlData);

      let userEmailParams = {
        email: config.email,
        subject: emailSubject,
        message: emailBody,
      };

      await smtp.sendEmail(userEmailParams);
    }
    catch (error)
    {
      req.flash('error', error.message);

      res.redirect('/contact-info');

      return "";
    }

    req.flash('success', 'Customer support team will contact to you with in 2 bussiness days.');

    res.redirect('/contact-info');
   
  }
  catch (error) 
  {
    return {
      status: Status.FAIL,
      message: error.message
    }
  }
}
