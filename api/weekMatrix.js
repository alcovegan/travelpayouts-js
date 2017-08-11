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
		origin,
		destination,
		depart_date = dates.tomorrow,
		return_date = dates.twoWeeksPlus,
		currency = 'rub',
		show_to_affiliates = true,
		removeParams,
		debug = false,
		generateUrls = {}
	} = {}) => {

	// дефолтное значение у depart_date, если не указать явно - завтра
	// дефолтное значение у return_date, если не указать явно - сегодня + 2 недели

	const options = {
		origin: origin,
		destination: destination,
		depart_date: depart_date,
		return_date: return_date,
		currency: currency,
		show_to_affiliates: show_to_affiliates
	}

	if(removeParams && removeParams.length > 0) {
		removeDefaults(removeParams, options)
	}

	const baseOptions = {
		token: token
	}

	const requestOptions = makeQuery(Object.assign({}, baseOptions, options));
	const requestURL = makeRequestURL('weekMatrix', requestOptions);

	if(debug) {
		console.log('------------------------------------------------------------------------------');
		logger.info('Options sended in request to api.weekMatrix()', Object.assign(baseOptions, options));
		logger.info('Request from api.weekMatrix() sended to this URL:', requestURL);
	}

	const result = request.get(requestURL);

	return result
			.then(response => checkSuccessRequest(response))
			.then(d => {
				const data = d.data;

				if(Object.keys(generateUrls).length > 0) {

					data.map(ticket => {
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

				return data
			})
			.catch(err => checkErrorRequest(err))

}
