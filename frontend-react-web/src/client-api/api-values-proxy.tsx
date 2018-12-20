import ApiBase from './api-base';
import { Values } from './api-models';

class ApiValuesProxy extends ApiBase<Values> {

    protected getPath() : string {
    	return 'Values';
    }

}

// const ApiValues = new ApiValuesProxy();

export default ApiValuesProxy;