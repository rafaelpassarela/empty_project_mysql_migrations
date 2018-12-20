export type ApiDataCallback = (data: any) => any;
export type ApiErrorCallback = (error: any) => any;

export enum ApiMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
	HEAD = 'HEAD',
	OPTIONS = 'OPTIONS'
};

export enum ApiMode {
	SAME_ORIGIN = 'same-origin',
	NO_CORS = 'no-cors',
	CORS = 'cors',
	NAVIGATE = 'navigate'
};

export enum ApiCache {
	DEFAULT = 'default',
	NO_CACHE = 'no-cache',
	RELOAD = 'reload',
	FORCE_CACHE = 'force-cache',
	ONLY_IF_CACHED = 'only-if-cached',
	NO_STORE = 'no-store'
};

export enum ApiCredentials {
	SAME_ORIGIN = 'same-origin',
	INCLUDE = 'include',
	OMIT = 'omit'
};

export enum ApiRedirect {
	FOLLOW = 'follow',
	MANUAL = 'manual',
	ERROR = 'error'
};