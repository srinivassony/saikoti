const config = require('../../../config');
// const logger = require('../../services/logging');

const dbServer = config.dbServer || "GOS";


let knex = require("../config/common-knex");

const times = {};

knex.on('query', (query) =>
{
	const uid = query.__knexQueryUid;
	times[uid] = {
		startTime: new Date(),
	};
});

knex.on('query-error', (error, query) =>
{
	const uid = query.__knexQueryUid;
	times[uid].errorTime = new Date();
	times[uid].dbError = error;
	times[uid].dbQuery = query;

	const { startTime, errorTime, dbError, dbQuery } = times[uid];
	const elapsedTime = errorTime - startTime;
	// logger.log("ERROR", "Knex query error", {
	// 	queryData: {
	// 		__knexUid: dbQuery.__knexUid,
	// 		__knexQueryUid: dbQuery.__knexQueryUid,
	// 		method: dbQuery.method,
	// 		sql: dbQuery.sql,
	// 		bindings: dbQuery.bindings
	// 	},
	// 	pool: {
	// 		used: knex.client.pool.numUsed(),
	// 		free: knex.client.pool.numFree(),
	// 		pendingAcquires: knex.client.pool.numPendingAcquires(),
	// 		pendingCreates: knex.client.pool.numPendingCreates()
	// 	},
	// 	queryStats: {
	// 		queryInitiatedAt: startTime,
	// 		queryCompletedAt: errorTime,
	// 		queryTime: elapsedTime
	// 	},
	// 	error: dbError,
	// 	bindings: query.bindings
	// })

	delete times[uid];
});

knex.on('query-response', (response, query, builder) =>
{
	const uid = query.__knexQueryUid;
	times[uid].endTime = new Date();
	times[uid].dbQuery = query;

	const { startTime, endTime, dbQuery } = times[uid];
    const elapsedTime = endTime - startTime;

	// logger.log("INFO", "Knex query completed", {
	// 	queryData: {
	// 		__knexUid: dbQuery.__knexUid,
	// 		__knexQueryUid: dbQuery.__knexQueryUid,
	// 		method: dbQuery.method,
	// 		sql: dbQuery.sql,
	// 		bindings: dbQuery.bindings
	// 	},
	// 	pool: {
	// 		used: knex.client.pool.numUsed(),
	// 		free: knex.client.pool.numFree(),
	// 		pendingAcquires: knex.client.pool.numPendingAcquires(),
	// 		pendingCreates: knex.client.pool.numPendingCreates()
	// 	},
	// 	queryStats: {
	// 		queryInitiatedAt: startTime,
	// 		queryCompletedAt: endTime,
	// 		queryTime: elapsedTime
	// 	},
	// 	sql: `${dbQuery.sql}`
	// })

	delete times[uid];
});

knex.client.pool.on('acquireFail', (eventId, err) =>
{
	// logger.log("INFO", "Knex query timedout", {
	// 	pool: {
	// 		used: knex.client.pool.numUsed(),
	// 		free: knex.client.pool.numFree(),
	// 		pendingAcquires: knex.client.pool.numPendingAcquires(),
	// 		pendingCreates: knex.client.pool.numPendingCreates()
	// 	}
	// })
});

const { Model } = require('objection');
Model.knex(knex);

module.exports = { Model, knex };
