import ApiValuesProxy from './api-values-proxy';

class ApiHelper {

	apiValues = new ApiValuesProxy();

	public Values() : ApiValuesProxy{
		return this.apiValues;
	}

}

const Api = new ApiHelper();

export default Api;