const config = require('../../config');
const JwtConfig = config.jwt;

const jwt = require('jsonwebtoken');
const { userType } = require('../utills/utils');


let generateToken = async (user) => 
{
    return jwt.sign({ user }, JwtConfig.secret_key, { expiresIn: JwtConfig.expiresin });
};

let validateToken = async (token, callback) => 
{

    jwt.verify(token, JwtConfig.secret_key, async function (error, decoded) 
    {
        if (error) 
        {
            let result = {
                status: 0,
                message: error.message,
                error: error
            };

            callback(result);
        }
        else if (!decoded || !decoded.user) 
        {
            let result = {
                status: 0,
                message: "Something went wrong!. User details are not extracted from token!",
                error: decoded
            };

            callback(result);
        }
        else
        {
            let result = {
                status: 1,
                user: decoded.user
            };

            callback(result);
        }
    });
};

function authorize(roles)
{
    return async (req, res, next) => 
    {
        if (validateRole(req, roles))
        {
            next();
        }
        else
        {

            return res.json({
                status: 0,
                message: "Authorization failed: Do not have access for this API",
            });
        }
    };
}

function validateRole(req, roles = [])
{
    if (!req.smUser || !req.smUser.role)
    {
        return false;
    }
    else if (roles.length == 0)
    {
        return false;
    }

    let userRole = req.smUser.role;

    let finalRoles = [];

    for (let index = 0; index < roles.length; index++)
    {
        const role = roles[index];

        if (role == userType.TEACHER)
        {
            finalRoles.push(userType.TEACHER);
        }
        else if (role == userType.STUDENT)
        {
            finalRoles.push(userType.STUDENT);
        }
        else
        {
            finalRoles.push(role);
        }
    }

    for (let index = 0; index < finalRoles.length; index++)
    {
        const role = finalRoles[index];

        if (userRole.search(role) >= 0)
        {
            return true;
        }
    }

    return false;
}

module.exports = {
    generateToken: generateToken,
    validateToken: validateToken,
    authorize: authorize
};