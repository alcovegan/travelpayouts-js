const querystring = require('querystring');

module.exports = (options) => {

	const {
		url = 'http://hydra.aviasales.ru',
		origin_iata,
		destination_iata,
		depart_date = '',
		return_date = '',
		adults = 1,
		children = 0,
		infants = 0,
		trip_class = 0,
		marker = '',
		with_request = false,
		currency = 'RUB',
		locale = 'ru'
	} = options;

	const requestOptions = {
		origin_iata,
		destination_iata,
		depart_date,
		return_date,
		adults,
		children,
		infants,
		trip_class,
		marker,
		with_request,
		currency,
		locale
	}

	const generated = querystring.stringify(requestOptions);
	const URL = `${url}/searches/new?${generated}`;

	return URL

}