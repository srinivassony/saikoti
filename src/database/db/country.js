const Country = require('../../database/model/country');

let getCountryDetails = async () =>
{
  return await Country.query().select();
}

module.exports = {
  getCountryDetails : getCountryDetails
}