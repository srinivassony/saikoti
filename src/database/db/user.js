const User = require('../../database/model/user');
const { orWhere } = require('../config/common-knex');


let getExsitingUserDetails = async (email, phone) =>
{
  return await User.query().select().where('email', email).orWhere('phone', phone).first();
}

let createUser = async(data) =>
{
    return await User.query().insert(data);
}

module.exports = {
  getExsitingUserDetails : getExsitingUserDetails,
  createUser: createUser
}