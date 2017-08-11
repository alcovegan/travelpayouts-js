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
		month,
		show_to_affiliates = true,
		currency = 'rub',
		removeParams,
		debug = false,
		generateUrls = {}
	} = {}) => {

	// судя по всему, если сюда не передавать явно month, то
	// будут возвращаться результаты на следующий месяц

	const options = {
		currency: currency,
		show_to_affiliates: show_to_affiliates
	}

	const baseOptions = {
		token: token
	}

	if(!month) {
		options["month"] = dates.monthFromFirst;
	}

	if(origin) {
		options["origin"] = origin;
	}

	if(destination) {
		options["destination"] = destination;
	}

	if(month) {
		options["month"] = month;
	}

	if(removeParams && removeParams.length > 0) {
		removeDefaults(removeParams, options)
	}

	const requestOptions = makeQuery(Object.assign({}, baseOptions, options));
	const requestURL = makeRequestURL('monthMatrix', requestOptions);

	if(debug) {
		console.log('------------------------------------------------------------------------------');
		logger.info('Options sended in request to api.monthMatrix()', Object.assign(baseOptions, options));
		logger.info('Request from api.monthMatrix() sended to this URL:', requestURL);
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
