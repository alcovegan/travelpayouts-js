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
	// если не указана дата вылета, то ставим текущую + 2 дня
	{
		origin,
		destination,
		depart_date = dates.today2,
		one_way = false,
		show_to_affiliates = true,
		removeParams,
		debug = false,
		generateUrls = {}
	} = {}) => {

	const options = {
		origin: origin,
		destination: destination,
		depart_date: depart_date,
		one_way: one_way,
		show_to_affiliates: show_to_affiliates
	}

	if(removeParams && removeParams.length > 0) {
		removeDefaults(removeParams, options)
	}

	const baseOptions = {
		token: token
	}

	const requestOptions = makeQuery(Object.assign({}, baseOptions, options));
	const requestURL = makeRequestURL('', requestOptions, 'http://min-prices.aviasales.ru/calendar_preload');

	if(debug) {
		console.log('------------------------------------------------------------------------------');
		logger.info('Options sended in request to api.minPricesCalendar()', Object.assign(baseOptions, options));
		logger.info('Request from api.minPricesCalendar() sended to this URL:', requestURL);
	}

	const result = request.get(requestURL);

	return result
			.then(response => checkSuccessRequest(response))
			.then(d => {

				if(Object.keys(generateUrls).length > 0) {

					d.best_prices.map(ticket => {
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

					d.current_depart_date_prices.map(ticket => {
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
			.catch(err => checkErrorRequest(err, {}))

}
