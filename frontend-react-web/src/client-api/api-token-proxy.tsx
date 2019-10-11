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

class ApiTokenProxy extends ApiBase {

	protected getPath(): string {
		return 'token';
	}

	/**
	* Path Name: /api/token
	* Consumes:
	*	- application/x-www-form-urlencoded
	*/
	public Token_Post(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, grant_type: string, username: string, password: string) {
		this.post(dataCallback, errorCallback, undefined, "grant_type=" + this.encodeParams(grant_type)
			+ "&username=" + this.encodeParams(username)
			+ "&password=" + this.encodeParams(password));
	}

}

export default ApiTokenProxy;
