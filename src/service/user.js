const db = require('../database/db/user');
const common = require('../utills/utils');
const Status = common.Status;
const Authentication = require('../service/authentication');
const htmlTemplate = require('../utills/htmlTemplate');
const smtp = require('../service/smtp')

let createUser = async (reqParams) => 
{
    let email = reqParams.email ? reqParams.email.toLowerCase() : null;

    let phone = reqParams.phone ? reqParams.phone : null;

    let existingUserDetails = await db.getExsitingUserDetails(email, phone);

    if (existingUserDetails) 
    {
        if (existingUserDetails.email == email) 
        {
            return {
                status: Status.FAIL,
                message: 'User email already exists. Try with different email.'
            }
        }
        else if (existingUserDetails.phone == phone) 
        {
            return {
                status: Status.FAIL,
                message: 'Phone number already exists.'
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

    try
    {
        var htmlData = {
            name: user.userName ? user.userName : '',
            id: user.id ? user.id : null
        };

        let emailSubject = `${user.userName} you are invited to SaiKotiOnline`;
        let emailBody = htmlTemplate.generateUserInvitation(htmlData);

        let userEmailParams = {
            email: user.email,
            subject: emailSubject,
            message: emailBody,
        };

        let x = await smtp.sendEmail(userEmailParams);

    }
    catch (error)
    {
        console.log(error)
    }

    return {
        status: Status.SUCCESS,
        data: {
            user : data
        }
    }
}

let InviteUser = async (id) => 
{   
    let userDetails = await db.getUserDetails(id);

    if(!userDetails)
    {
        return {
            status: Status.FAIL,
            message: 'User details not found.'
        }
    }

    let params = {
        isRegistered: 1,
        isInvited: 1,
        inviteOn: new Date(),
        updatedAt: new Date(),
        updatedBy: userDetails.uuid
    }

    let updateUser = await db.updateUser(id, params);

    return {
        status: Status.SUCCESS,
        message : 'update successful.'
    }
}

let reSendInviteUser = async (id) => 
{   
    try
    {
     let userDetails = await db.getUserDetails(id);

    if(!userDetails)
     {
        return {
            status: Status.FAIL,
            message: 'User details not found.'
        }
     }

        var htmlData = {
            name: userDetails.userName ? userDetails.userName : '',
            id: userDetails.id ? userDetails.id : null
        };

        let emailSubject = `${userDetails.userName} you are invited to SaiKotiOnline`; 
        let emailBody = htmlTemplate.generateUserInvitation(htmlData);

        let userEmailParams = {
            email: userDetails.email,
            subject: emailSubject,
            message: emailBody,
        };

        let x = await smtp.sendEmail(userEmailParams);

        return{
          status : Status.SUCCESS,
          message : 'Invitation email is sent to your email address'
        }
    }
    catch(error)
    {
      return {
         status : Status.FAIL,
         message : error.message
      }
    }
}

let UserLoginDetails = async (reqParams) => 
{
    try 
    {
        let email  = reqParams.email ? reqParams.email : null;
        let password = reqParams.pass ? reqParams.pass: null;

        let user = await db.getUserLoginDetails(email, password);

        if (!user) 
        {
            return {
                status: Status.FAIL,
                message: 'Username or password is incorrect.'
            }
        }

        if (user.isRegistered == 0 || user.isInvited == 0 || user.inviteOn == null) 
        {
            return {
                status: Status.FAIL,
                message: 'User login failed. Try to activate your account by click on to the resend link'
            }
        }

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
                user: data
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

let ResetPassword = async (reqParams) =>
{
    try 
    {
        let email = reqParams.email ? reqParams.email : null;

        let userDetails = await db.getUserByEmailId(email);

        if (!userDetails)
         {
            return {
                status: Status.FAIL,
                message: "User email not found"
            }
        }

        return {
          status : Status.SUCCESS,
          data : {
            userDetails : userDetails
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
    createUser: createUser,
    InviteUser: InviteUser,
    reSendInviteUser : reSendInviteUser,
    UserLoginDetails : UserLoginDetails,
    ResetPassword : ResetPassword
}