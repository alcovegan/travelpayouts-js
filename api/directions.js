const request = require('../helpers/request');
const dates = require('../helpers/dates');
const PATHS = require('../config/paths');
const makeQuery = require('../helpers/makeQuery');
const makeRequestURL = require('../helpers/makeRequestURL');
const checkSuccessRequest = require('../helpers/checkSuccessRequest');
const checkErrorRequest = require('../helpers/checkErrorRequest');
const removeDefaults = require('../helpers/removeDefaults');
const logger = require('../helpers/log-debug');

module.exports = (token) => (
	{
		origin_iata,
		one_way = false,
		locale = 'ru',
		removeParams,
		debug = false
	} = {}) => {

	const options = {
		origin_iata,
		one_way,
		locale
	}

	if(removeParams && removeParams.length > 0) {
		removeDefaults(removeParams, options)
	}

	const baseOptions = {
		token: token
	}

	const requestOptions = makeQuery(Object.assign({}, baseOptions, options));
	const requestURL = makeRequestURL('', requestOptions, 'http://map.aviasales.ru/supported_directions.json');

	if(debug) {
		console.log('------------------------------------------------------------------------------');
		logger.info('Options sended in request to api.directions()', Object.assign(baseOptions, options));
		logger.info('Request from api.directions() sended to this URL:', requestURL);
	}

	const result = request.get(requestURL);

	return result
			.then(response => checkSuccessRequest(response))
			.then(d => d)
			.catch(err => checkErrorRequest(err, {}))

}
