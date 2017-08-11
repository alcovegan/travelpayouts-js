module.exports = function(params, options) {
	params.forEach(param => delete options[param]);
}