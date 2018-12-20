import { ApiConfig } from './api-config';
import { ApiMode, ApiCache, ApiCredentials, ApiMethod, ApiRedirect } from './api-types';

// import { Values } from './api-models';

// interface IApi<T>{
// 	getPath() : string;
// }

// More about the Fetch default API
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
// https://www.robinwieruch.de/react-fetching-data/

class ApiBase<T> { //implements IApi<Values>{

	protected getPath(): string {
		throw new Error("getPath is not implemented!");
	}

	protected getMode(): ApiMode {
		return ApiMode.CORS;
	}

	protected getCache(): ApiCache {
		return ApiCache.NO_CACHE;
	}

	protected getCredentials(): ApiCredentials {
		return ApiCredentials.INCLUDE;
	}

	protected getRedirect(): ApiRedirect {
		return ApiRedirect.FOLLOW;
	}

	translatePath(endPath?: string): string {
		return ApiConfig.URL + this.getPath() + ((endPath != undefined) ? endPath : '');
	}

	public get(endPath?: string) {
		this.doFetch(ApiMethod.GET, this.translatePath(endPath));
		// return 'Get from [' + ApiConfig.URL + ']' + this.getPath();
	}

	doFetch(requestMethod: ApiMethod, url: string, bodyData?: any) {

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        	console.log(requestMethod + ' -> ' + url);
        }

		return fetch(url, {
			method: requestMethod,
			mode: this.getMode(),
			cache: this.getCache(),
			credentials: this.getCredentials(),
			headers: {
				Accept: 'application/json',
				"Content-Type": 'application/json; charset=utf-8',
				"Access-Control-Allow-Origin": '*'
			},
			redirect: this.getRedirect(),
			body: ((bodyData != undefined) ? JSON.stringify(bodyData) : undefined)
		})
			.then(response => response.json()); // parses response to JSON
	}

}

export default ApiBase;