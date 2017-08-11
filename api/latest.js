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
		beginning_of_period,
		period_type = 'month',
		one_way = false,
		show_to_affiliates = true,
		limit = 30,
		page = 1,
		trip_class = 0,
		sorting = 'price',
		trip_duration,
		currency = 'rub',
		removeParams,
		debug = false,
		generateUrls = {}
	} = {}) => {

	const options = {
		currency: currency,
		period_type: period_type,
		one_way: one_way,
		page: page,
		limit: limit,
		show_to_affiliates: show_to_affiliates,
		sorting: sorting,
		trip_class: trip_class
	}

	const baseOptions = {
		token: token
	}

	// если не переданы оба значения ORIGIN и DESTINATION, то запрос вернет список всех последних билетов
	// (если не указывать пункт отправления и назначения, то API вернет 30 самых дешевых билетов, которые были найдены за последние 48 часов. (с))

	// если не передаем origin, то будет запрос без него
	if(origin) {
		options["origin"] = origin;
	}

	// если не передаем destination, то будет запрос без него
	if(destination) {
		options["destination"] = destination;
	}

	// если передаем period_type === month (или не передаем, но по дефолту стоит оно),
	// но не передаем beginning_of_period, то датой начала периода будет первое число месяца
	if(period_type === 'month' && !beginning_of_period) {
		options["beginning_of_period"] = dates.monthFromFirst;
	}

	// если передаем period_type === month и beginning_of_period
	// то датой начала периода будет дата переданная в beginning_of_period
	// (но при этом все равно должна быть датой с первым числом месяца, например следующий месяц и т.д.)
	// нужно для случаев, когда делаем запрос на +1-2-3 месяца вперед
	if(period_type === 'month' && beginning_of_period) {
		options["beginning_of_period"] = beginning_of_period;
	}

	// если не передаем origin и destination, нужно удалить из запроса
	// period_type и beginning_of_period, иначе запрос виснет
	// удалять нужно в конце, потому что до этого устанавливается period_type
	if(!origin && !destination) {
		delete options["period_type"];
		delete options["beginning_of_period"];
	}

	if(trip_duration) {
		options["trip_duration"] = trip_duration;
	}

	// если period_type === year и указан beginning_of_period - он не будет подставлен в запрос,
	// потому что в таком случае вернется пустой массив

	if(removeParams && removeParams.length > 0) {
		removeDefaults(removeParams, options)
	}

	const requestOptions = makeQuery(Object.assign({}, baseOptions, options));
	const requestURL = makeRequestURL('latest', requestOptions);

	if(debug) {
		console.log('------------------------------------------------------------------------------');
		logger.info('Options sended in request to api.latest()', Object.assign(baseOptions, options));
		logger.info('Request from api.latest() sended to this URL:', requestURL);
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
