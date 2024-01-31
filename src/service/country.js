const db = require('../database/db/country');
const { Status } = require('../utills/utils');

let countryDetails = async() =>
{
  try{
     let country = await db.getCountryDetails();

     if(country.length == 0)
     {
       return {
        status : Status.FAIL,
        message : error.message
      }
     }

     return {
       status : Status.SUCCESS,
       data : {
        country : country
      }
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

module.exports = {
  countryDetails  :   countryDetails  

} 