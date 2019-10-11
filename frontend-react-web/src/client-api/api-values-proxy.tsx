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

import ApiBase from './api-base';
import { ApiDataCallback, ApiErrorCallback } from './api-types';
import { Values } from './api-models';

class ApiValuesProxy extends ApiBase {

	protected getPath(): string {
		return 'Values';
	}

	/**
	* Path Name: /api/Values/{id}
	* Consumes:
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Values_Delete(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, id: number) {
		this.delete(dataCallback, errorCallback, undefined, '/' + id);
	}

	/**
	* Path Name: /api/Values/GetAll
	* Consumes:
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Values_GetAll(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback) {
		this.get(dataCallback, errorCallback, 'GetAll', undefined);
	}

	/**
	* Path Name: /api/Values/{id}
	* Consumes:
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Values_Get(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, id: number) {
		this.get(dataCallback, errorCallback, undefined, '/' + id);
	}

	/**
	* Path Name: /api/Values
	* Consumes:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*	- application/x-www-form-urlencoded
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Values_Post(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, value: Values) {
		this.post(dataCallback, errorCallback, undefined, value);
	}

}

export default ApiValuesProxy;
