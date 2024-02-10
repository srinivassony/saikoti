const db = require('../database/db/country');
const common = require('../utills/utils');
const Status = common.Status;
const htmlTemplate = require('../utills/htmlTemplate');
const smtp = require('../service/smtp');
const config = require('../../config');
const country = require('../database/db/country');

exports.getCountries = async () =>
{
    try
    {
        let countries = await db.getCountries();

        if (countries.length == 0)
        {
            return {
                status: Status.FAIL,
                message: 'country details not found.'
            }
        }

        return countries
    }
    catch (error) 
    {
        return {
            status: Status.FAIL,
            message: error.message
        }
    }
}

exports.getStatesByCountryId = async (reqParams) =>
{
    try
    {
        let countryId = reqParams.countryId ? reqParams.countryId : null;

        if (!countryId)
        {
            return {
                status: Status.FAIL,
                message: 'country Id is requried'
            }
        }

        let states = await db.getStatesByCountryId(countryId);

        if (states.length == 0)
        {
            return {
                status: Status.FAIL,
                message: 'states details not found.'
            }
        }

        return states
    }
    catch (error) 
    {
        return {
            status: Status.FAIL,
            message: error.message
        }
    }
}

exports.deleteCountry = async( ) =>
{
  try
 {
   let deleteCountries = await db.getDeleteCountries();

   let deletedIds = deleteCountries.filter(country => country && country.id).map(country => country && country.id);

   let deletedCountries = await db.deletedCountries(deletedIds);

   return deletedCountries;

}
catch(error)
{
    return {
        status: Status.FAIL,
        message: error.message
    }
}
}