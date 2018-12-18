import { ApiConfig } from './api-config';
// import { Values } from './api-models';

// interface IApi<T>{
// 	getPath() : string;
// }

class ApiBase<T> { //implements IApi<Values>{
    
    constructor() {
        
    }

    protected getPath() : string {
    	return 'base';
    }

    public get() : string{
    	return 'Get from [' + ApiConfig.URL + ']' + this.getPath();
    } 

}

export default ApiBase;