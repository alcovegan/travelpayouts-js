module.exports = {
	endpoint: 'http://api.travelpayouts.com/',
	methods: {
		latest: 'v2/prices/latest',
		monthMatrix: 'v2/prices/month-matrix',
		weekMatrix: 'v2/prices/week-matrix',
		nearestPlacesMatrix: 'v2/prices/nearest-places-matrix',
		cheap: 'v1/prices/cheap',
		monthly: 'v1/prices/monthly',
		direct: 'v1/prices/direct',
		calendar: 'v1/prices/calendar',
		holidaysByRoutes: 'v2/prices/holidays-by-routes',
		airline: 'v1/airline-directions',
		city: 'v1/city-directions',
		prices_for_dates: 'aviasales/v3/prices_for_dates'
	}
}
