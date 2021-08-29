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

import { CustomErrorData } from './api-types';
import ApiAccountProxy from './api-account-proxy';
import ApiRolesProxy from './api-roles-proxy';
import ApiValuesProxy from './api-values-proxy';
import ApiTokenProxy from './api-token-proxy';

class ApiHelper {

	private apiAccountProxy = new ApiAccountProxy();
	private apiRolesProxy = new ApiRolesProxy();
	private apiValuesProxy = new ApiValuesProxy();
	private apiTokenProxy = new ApiTokenProxy();

	public Account() : ApiAccountProxy{
		return this.apiAccountProxy;
	}
	public Roles() : ApiRolesProxy{
		return this.apiRolesProxy;
	}
	public Values() : ApiValuesProxy{
		return this.apiValuesProxy;
	}
	public token() : ApiTokenProxy{
		return this.apiTokenProxy;
	}

	public setToken(value: string | undefined) {
		this.apiAccountProxy.setToken(value);
		this.apiRolesProxy.setToken(value);
		this.apiValuesProxy.setToken(value);
		this.apiTokenProxy.setToken(value);
	}
}

const Api = new ApiHelper();

export default Api;

export class ErrorData extends CustomErrorData {};