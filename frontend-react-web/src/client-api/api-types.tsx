/********************************************************************
*            MrRafael.ca - Swagger Generator for React              *
* Sample Api by MrRafael.ca - v1                                    *
* This client Api was generated on 06/10/2019 20:48:13              *
*                                          Do not change this file! *
*                                                                   *
* Optimized for use as part of the project                          *
* https://github.com/rafaelpassarela/empty_project_mysql_migrations *
*                                                                   *
* Generated at -> http://mrrafael.ca/swgen/                         *
********************************************************************/

export class CustomErrorData extends Error {
	data?: any;
}
export type ApiDataCallback = (data: any, done?: boolean) => any;
export type ApiErrorCallback = (error: CustomErrorData, done?: boolean) => any;

export enum ApiMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
	PATCH = "PATCH",
	HEAD = "HEAD",
	OPTIONS = "OPTIONS"
};

export enum ApiMode {
	SAME_ORIGIN = "same-origin",
	NO_CORS = "no-cors",
	CORS = "cors",
	NAVIGATE = "navigate"
};

export enum ApiCache {
	DEFAULT = "default",
	NO_CACHE = "no-cache",
	RELOAD = "reload",
	FORCE_CACHE = "force-cache",
	ONLY_IF_CACHED = "only-if-cached",
	NO_STORE = "no-store"
};

export enum ApiCredentials {
	SAME_ORIGIN = "same-origin",
	INCLUDE = "include",
	OMIT = "omit"
};

export enum ApiRedirect {
	FOLLOW = "follow",
	MANUAL = "manual",
	ERROR = "error"
};
