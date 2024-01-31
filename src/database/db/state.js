const State = require('../../database/model/state');

let getStateDetails = async (countryId) =>
{
  return await State.query().select('stateName').where('countryId', countryId);
}

module.exports = {
  getStateDetails : getStateDetails
}
