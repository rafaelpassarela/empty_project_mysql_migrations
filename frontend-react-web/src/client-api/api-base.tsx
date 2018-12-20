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
		return ApiCredentials.SAME_ORIGIN;
	}

	protected getRedirect(): ApiRedirect {
		return ApiRedirect.FOLLOW;
	}

	translatePath(endPath?: string): string {
		return ApiConfig.URL + this.getPath() + ((endPath != undefined) ? endPath : '');
	}

	public get(dataCallback : any, errorCallback : any, endPath?: string) {
		this.doFetch(ApiMethod.GET, this.translatePath(endPath), dataCallback, errorCallback);
		// return 'Get from [' + ApiConfig.URL + ']' + this.getPath();
	}

	doFetch(
		requestMethod: ApiMethod, url: string,
		dataCallback: any, errorCallback: any, bodyData?: any) {

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
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(response.status + ' - ' + response.statusText);
				}
			})
			.then(data => console.log(data))
			.catch(error => errorCallback(error));
	}

}

export default ApiBase;