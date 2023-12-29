const { v4: uuidv4 } = require('uuid');

function generateUUID() 
{
    return uuidv4().split('-').join('').toUpperCase();
}

const status = {
    SUCCESS: 1,
    FAIL: 0
}

const userType = {
    USER: "USER"
}

module.exports = {
    generateUUID: generateUUID,
    Status: status,
    userType: userType
}