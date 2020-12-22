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
		depart_date = dates.month,
		return_date,
		calendar_type = 'departure_date',
		trip_duration,
		currency = 'rub',
		removeParams,
		debug = false,
		generateUrls = {}
	} = {}) => {

	// если не передавать сюда depart_date, который вроде как является обязательным,
	// то выведутся билеты на аж год вперед

	const options = {
		origin: origin,
		destination: destination,
		depart_date: depart_date,
		calendar_type: calendar_type,
		currency: currency
	}

	if(return_date) {
		options["return_date"] = return_date
	}

	if(trip_duration) {
		options["trip_duration"] = trip_duration
	}

	if(removeParams && removeParams.length > 0) {
		removeDefaults(removeParams, options)
	}

	const baseOptions = {
		token: token
	}

	const requestOptions = makeQuery(Object.assign({}, baseOptions, options));
	const requestURL = makeRequestURL('calendar', requestOptions);

	if(debug) {
		console.log('------------------------------------------------------------------------------');
		logger.info('Options sended in request to api.calendar()', Object.assign(baseOptions, options));
		logger.info('Request from api.calendar() sended to this URL:', requestURL);
	}

	const result = request.get(requestURL);

	return result
			.then(response => checkSuccessRequest(response))
			.then(d => {

				const data = d.data;
				var newData = [];

				Object.keys(data).map(dayOfMonth => {
					let ticket = data[dayOfMonth];
					ticket["day_of_month"] = dayOfMonth;

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
