import { ApiConfig } from './api-config';
import { ApiMode, ApiCache, ApiCredentials, ApiMethod, ApiRedirect, ApiDataCallback, ApiErrorCallback } from './api-types';

// import { Values } from './api-models';

// interface IApi<T>{
// 	getPath() : string;
// }

// More about the Fetch default API
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
// https://www.robinwieruch.de/react-fetching-data/

class ApiBase<T> { //implements IApi<Values>{

	desenvMode : number = -1;

	private translatePath(endPath?: string): string {
		return ApiConfig.URL + this.getPath() + ((endPath != undefined) ? endPath : '');
	}

	protected isDesenvMode() : boolean {
		if (this.desenvMode == -1) {
			this.desenvMode = ((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 1 : 0);
		}

		return this.desenvMode == 1;
	}

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

	public get(dataCallback : ApiDataCallback, errorCallback : ApiErrorCallback, endPath?: string) {
		this.doFetch(ApiMethod.GET, this.translatePath(endPath), dataCallback, errorCallback);
	}

	public delete(dataCallback : ApiDataCallback, errorCallback : ApiErrorCallback, endPath?: string) {
		this.doFetch(ApiMethod.DELETE, this.translatePath(endPath), dataCallback, errorCallback);
	}

	public post(dataCallback : ApiDataCallback, errorCallback : ApiErrorCallback, bodyData?: T) {
		this.doFetch(ApiMethod.POST, this.translatePath(''), dataCallback, errorCallback, bodyData);
	}

	doFetch(
		requestMethod: ApiMethod, url: string,
		dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, bodyData?: T) {

		if (this.isDesenvMode()) {
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
					const contentType = response.headers.get("content-type");
					if (contentType && contentType.indexOf("application/json") !== -1) {
						return response.json();
					} else {
						return response.text();
					}
				} else {
					throw new Error(response.status + ' - ' + response.statusText);
				}
			})
			.then(data => dataCallback(data))
			.catch(error => errorCallback(error));
	}

}

export default ApiBase;