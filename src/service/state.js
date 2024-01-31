const db = require('../database/db/state');
const { Status } = require('../utills/utils');

let stateDetails = async(reqParams) =>
{
  try{
   let state = await db.getStateDetails(reqParams.countryId);

   if(state.length == 0)
   {
     return {
       status : Status.FAIL,
       message : 'countryId Not Found'
     }
   }

   return {
    status : Status.SUCCESS,
    data : {
      state : state
    }
  }
 }catch(error)
 {
   return {
    status : Status.FAIL,
    message : error.message
  }
 }
}

module.exports = {
  stateDetails : stateDetails
}