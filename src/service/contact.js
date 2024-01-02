const db = require('../database/db/contact');
const common = require('../utills/utils');
const Status = common.Status;
const Authentication = require('../service/authentication');
// const htmlTemplate = require('../utills/htmlTemplate');
// const smtp = require('../service/smtp')


let createContact = async (reqParams, owner) => 
{
  try 
  {

    let params = {
      name: reqParams.name,
      uuid: owner.uuid,
      email: reqParams.email,
      phone: reqParams.phone,
      message: reqParams.message,
      createdAt: new Date(),
      createdBy: owner.uuid
    } 

    let userContact = await db.createContact(params);

    return {
      status : Status.SUCCESS,
      data : {
        userContact : userContact
      }
    }
  }
  catch (error) 
  {
    return {
      status: Status.FAIL,
      message: error.message
    }
  }
}

module.exports = {
  createContact: createContact
}