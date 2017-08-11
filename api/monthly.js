const request = require('../helpers/request');
const dates = require('../helpers/dates');
const format = require('date-fns/format');
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
		origin = "MOW",
		destination = "LED",
		currency = 'rub',
		removeParams,
		debug = false,
		generateUrls = {}
	} = {}) => {

	const options = {
		origin: origin,
		destination: destination,
		currency: currency
	}

	if(removeParams && removeParams.length > 0) {
		removeDefaults(removeParams, options)
	}

	const baseOptions = {
		token: token
	}

	const requestOptions = makeQuery(Object.assign({}, baseOptions, options));
	const requestURL = makeRequestURL('monthly', requestOptions);

	if(debug) {
		console.log('------------------------------------------------------------------------------');
		logger.info('Options sended in request to api.monthly()', Object.assign(baseOptions, options));
		logger.info('Request from api.monthly() sended to this URL:', requestURL);
	}

	const result = request.get(requestURL);

	return result
			.then(response => checkSuccessRequest(response))
			.then(d => {

				const data = d.data;
				var newData = [];

				Object.keys(data).map(month => {
					let ticket = data[month];
					ticket["month"] = month;

					newData.push(ticket);
				})

				if(Object.keys(generateUrls).length > 0) {

					newData.map(ticket => {
						ticket["searchlink"] = generateURL(
							Object.assign(
								{},
								generateUrls,
								{
									"origin_iata": ticket.origin,
									"destination_iata": ticket.destination,
									"depart_date": format(ticket.departure_at, 'YYYY-MM-DD'),
									"return_date": format(ticket.return_at, 'YYYY-MM-DD')
								}));
					})
				}

				return newData
			})
			.catch(err => checkErrorRequest(err))

}
