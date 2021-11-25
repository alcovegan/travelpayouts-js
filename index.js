require('dotenv').config()
const dates = require('./helpers/dates');
const apiToken = process.env.TPAPITOKEN;

module.exports = ({token} = {}) => {

	if(apiToken) {
		token = apiToken;
	}

	if(!token && !apiToken) {
		throw new Error("Looks like API token is not provided. You can do in by process.env.TPAPITOKEN or by passing object with key 'token' and token as value when require module. See readme for details.")
	}

	const latest = require('./api/latest')(token);
	const monthMatrix = require('./api/monthMatrix')(token);
	const weekMatrix = require('./api/weekMatrix')(token);
	const nearestPlacesMatrix = require('./api/nearestPlacesMatrix')(token);
	const cheap = require('./api/cheap')(token);
	const monthly = require('./api/monthly')(token);
	const direct = require('./api/direct')(token);
	const calendar = require('./api/calendar')(token);
	const holidaysByRoutes = require('./api/holidaysByRoutes')(token);
	const minPricesCalendar = require('./api/minPricesCalendar')(token);
	const directions = require('./api/directions')(token);
	const prices = require('./api/prices')(token);
	const airline = require('./api/airline')(token);
	const city = require('./api/city')(token);
	const prices_for_dates = require('./api/prices_for_dates')(token);

return {
	helpers: {
		daysBeforeNextMonth: dates.daysBeforeNextMonth
	},
	latest,
	monthMatrix,
	weekMatrix,
	nearestPlacesMatrix,
	cheap,
	monthly,
	direct,
	calendar,
	holidaysByRoutes,
	minPricesCalendar,
	directions,
	prices,
	airline,
	city,
	prices_for_dates
}

}
