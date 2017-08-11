const querystring = require('querystring');

module.exports = function makeQuery(options) {
	return querystring.stringify(options)
}