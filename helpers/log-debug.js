const winston = require('winston');

const logger = new winston.Logger({
	levels: {
		info: 5
	},
	colors: {
		info: 'green'
	},
	transports: [
		new winston.transports.Console({
		  handleExceptions: true,
		  json: false,
		  level: 'info',
		  colorize: true,
		  prettyPrint: true
		})
	],
	exitOnError: false
});

module.exports = logger;