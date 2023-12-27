const User = require('../../database/model/user');


let createUser = async(data) =>
{
    return await User.query().insert(data);
}

module.exports = {
  createUser : createUser
}