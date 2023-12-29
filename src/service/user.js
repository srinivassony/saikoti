const db = require('../database/db/user');
const common = require('../utills/utils');
const Status = common.Status;
const Authentication = require('../service/authentication');

let createUser = async (reqParams) => 
{
    let email = reqParams.email ? reqParams.email.toLowerCase() : null;

    let phone = reqParams.phone ? reqParams.phone : null;

    let existingUserDetails = await db.getExsitingUserDetails(email, phone);

    if (existingUserDetails) 
    {
        if(existingUserDetails.email == email)
        {
            return {
                status :Status.FAIL,
                message:'User email already exists. Try with different email.'
            }
        }
        else if(existingUserDetails.phone == phone)
        {
            return {
                status :Status.FAIL,
                message:'Phone number already exists.'
            }
        }
    }

    let uuid = common.generateUUID();

    let params = {
        userName: reqParams.userName,
        password: reqParams.password,
        uuid: uuid,
        email: email,
        phone: phone,
        dob: reqParams.dob,
        country: reqParams.country,
        state: reqParams.state,
        gender: reqParams.gender,
        role: 'USER',
        createdAt: new Date(),
        createdBy: uuid
    }

    let user = await db.createUser(params);

    let tokenUser = {
        id: user.id,
        name: user.userName,
        email: user.email,
        role: user.role,
        uuid: user.uuid
    };

    let token = await Authentication.generateToken(tokenUser);

    let data = {
        ...tokenUser,
        token: token
    }

    return {
        status: Status.SUCCESS,
        data: {
            user : data
        }
    }
}

module.exports = {
 createUser : createUser
}