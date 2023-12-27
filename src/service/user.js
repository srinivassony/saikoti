const db = require('../database/db/user');

let createUser = async(reqParams) =>
{
    try 
    {
        console.log(reqParams)
        let params = {
            name: reqParams.name
        }
        console.log(params)
        let user = await db.createUser(params);

        return {
            status: 1,
            data: {
                user: user
            }
        }

    }
    catch (error) {
        return {
            status: 0,
            message: error.message
        }
    }
}

module.exports = {
 createUser : createUser
}