const Count = require('../../database/model/count');

let getCounts = async (uuid) =>
{
  return await Count.query().select().where('uuid', uuid).first();
}

let addCount = async(data) =>
{
    return await Count.query().insert(data);
}

let updateCount = async (id, data) =>
{
    return await Count.query().patchAndFetchById(id, data);
}

module.exports = {
    getCounts: getCounts,
    addCount: addCount,
    updateCount: updateCount
}