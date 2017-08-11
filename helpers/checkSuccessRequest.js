module.exports = function checkSuccessRequest(requestData) {

	// console.log(requestData.config);

	if(requestData.status === 200 && requestData.data !== null) {
		return requestData.data
	} else if (requestData.status !== 200 || !requestData.data) {
		return []
	}

}
