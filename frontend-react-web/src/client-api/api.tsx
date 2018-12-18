import ApiValues from './api-values-proxy';

class ApiHelper {

	public Values() {
		return ApiValues;
	}

}

const Api = new ApiHelper();

export default Api;