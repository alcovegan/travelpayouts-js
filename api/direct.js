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
		destination = "-",
		depart_date,
		return_date,
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

	if(depart_date) {
		options["depart_date"] = depart_date;
	}

	if(return_date) {
		options["return_date"] = return_date;
	}

	if(removeParams && removeParams.length > 0) {
		removeDefaults(removeParams, options)
	}

	const baseOptions = {
		token: token
	}

	const requestOptions = makeQuery(Object.assign({}, baseOptions, options));
	const requestURL = makeRequestURL('direct', requestOptions);

	if(debug) {
		console.log('------------------------------------------------------------------------------');
		logger.info('Options sended in request to api.direct()', Object.assign(baseOptions, options));
		logger.info('Request from api.direct() sended to this URL:', requestURL);
	}

	const result = request.get(requestURL);

	return result
			.then(response => checkSuccessRequest(response))
			.then(d => {

				var newResults = [];
				const data = d.data;
				const destinations = Object.keys(data);

				destinations.map(dest => {
					var newTicket = data[dest]["0"];

					newTicket["origin"] = origin;
					newTicket["destination"] = dest;

					newResults.push(newTicket);
				})

				if(Object.keys(generateUrls).length > 0) {

					newResults.map(ticket => {
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

				return newResults
			})
			.catch(err => checkErrorRequest(err))

}
