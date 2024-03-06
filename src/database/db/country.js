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

let getDeleteCountries = async() =>
{
  return await Country.query().select().whereNotIn('id', State.query().select(['countryId']))
}

let deletedCountries = async(ids) =>
{
    return await Country.query().delete().whereIn('id', ids);
}

module.exports = {
    getCountries: getCountries,
    getStatesByCountryId: getStatesByCountryId,
    getDeleteCountries: getDeleteCountries,
    deletedCountries: deletedCountries
}