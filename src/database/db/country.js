const Country = require('../../database/model/country');
const State = require('../../database/model/state');


let getCountries = async () =>
{
  return await Country.query().select();
}

let getStatesByCountryId = async (id) =>
{
    return await State.query().select().where('countryId', id);
}

let deleteCountries = async() =>
{
  return await Country.query().select().whereNotIn('id', State.query().select(['countryId']))
}

module.exports = {
  getCountries: getCountries,
  getStatesByCountryId: getStatesByCountryId,
  deleteCountries: deleteCountries
  }