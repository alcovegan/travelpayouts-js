const request = require('axios');

const customInstance = request.create({
	timeout: 10000,
	responseType: "json",
	headers: {
		"Accept-Encoding": "gzip, deflate"
	}
})

module.exports = customInstance;
