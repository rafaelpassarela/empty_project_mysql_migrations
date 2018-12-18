import ApiBase from './api-base';
import { Values } from './api-models';

class ApiValuesProxy extends ApiBase<Values> {

    protected getPath() : string {
    	return 'values';
    }

}

const ApiValues = new ApiValuesProxy();

export default ApiValues;