const PATHS = require('../config/paths');

module.exports = function makeRequestURL(method = '', requestOptions, different = null) {

	if(different) {
		return `${different}?${requestOptions}`
	}

	return `${PATHS.endpoint}${PATHS.methods[method]}?${requestOptions}`
}