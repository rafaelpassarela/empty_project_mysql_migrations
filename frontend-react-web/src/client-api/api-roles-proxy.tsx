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
import { IdentityRole } from './api-models';

class ApiRolesProxy extends ApiBase {

	protected getPath(): string {
		return 'Roles';
	}

	/**
	* Path Name: /api/Roles/{id}
	* Consumes:
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Roles_Delete(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, id: string) {
		this.delete(dataCallback, errorCallback, undefined, '/' + id);
	}

	/**
	* Path Name: /api/Roles
	* Consumes:
	* Produces:
	*	- application/json
	*	- text/json
	*	- application/xml
	*	- text/xml
	*/
	public Roles_Get(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback) {
		this.get(dataCallback, errorCallback, undefined, undefined);
	}

	/**
	* Path Name: /api/Roles
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
	public Roles_Post(dataCallback: ApiDataCallback, errorCallback: ApiErrorCallback, role: IdentityRole) {
		this.post(dataCallback, errorCallback, undefined, role);
	}

}

export default ApiRolesProxy;
