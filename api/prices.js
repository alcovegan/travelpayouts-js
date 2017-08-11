const querystring = require('querystring');
const request = require('../helpers/request');
const dates = require('../helpers/dates');
const PATHS = require('../config/paths');
const makeQuery = require('../helpers/makeQuery');
const makeRequestURL = require('../helpers/makeRequestURL');
const checkSuccessRequest = require('../helpers/checkSuccessRequest');
const checkErrorRequest = require('../helpers/checkErrorRequest');
const removeDefaults = require('../helpers/removeDefaults');
const logger = require('../helpers/log-debug');
const generateURL = require('../helpers/generateUrl');

module.exports = (token) => (
	{
		origin_iata = "MOW",
		period = `${dates.monthFromFirst}:month`,
		direct = true,
		one_way = false,
		no_visa = true,
		schengen = true,
		need_visa = true,
		locale = 'ru',
		min_trip_duration_in_days = 13,
		max_trip_duration_in_days = 31,
		show_to_affiliates = true,
		removeParams,
		debug = false,
		generateUrls = {}
	} = {}) => {

	const options = {
		origin_iata,
		period,
		direct,
		one_way,
		no_visa,
		schengen,
		need_visa,
		locale,
		min_trip_duration_in_days,
		max_trip_duration_in_days,
		show_to_affiliates
	}

	if(removeParams && removeParams.length > 0) {
		removeDefaults(removeParams, options)
	}

	const baseOptions = {
		token: token
	}

	const requestOptions = makeQuery(Object.assign({}, baseOptions, options));
	const requestURL = makeRequestURL('', requestOptions, 'http://map.aviasales.ru/prices.json');

	if(debug) {
		console.log('------------------------------------------------------------------------------');
		logger.info('Options sended in request to api.prices()', Object.assign(baseOptions, options));
		logger.info('Request from api.prices() sended to this URL:', requestURL);
	}

	const result = request.get(requestURL);

	return result
			.then(response => checkSuccessRequest(response))
			.then(d => {

				if(Object.keys(generateUrls).length > 0) {
					d.map(ticket => {
						ticket["searchlink"] = generateURL(
							Object.assign(
								{},
								generateUrls,
								{
									"origin_iata": ticket.origin,
									"destination_iata": ticket.destination,
									"depart_date": ticket.depart_date,
									"return_date": ticket.return_date
								}));
					})
				}

				return d
			})
			.catch(err => checkErrorRequest(err))

}
