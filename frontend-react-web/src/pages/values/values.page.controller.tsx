// import * as React from 'react';
import BaseController from '../../components/base.controller';
import ApiValuesProxy from '../../client-api/api-values-proxy';
import Api from '../../client-api/api';
import { Values } from '../../client-api/api-models';

class ValuesController extends BaseController<Values> {

	protected getCaption(): string {
		return 'Value List';
	}

	protected getDescription(): string {
		return 'List of Values loaded from the database';
	}

	protected getLoadindInfo(): { caption: string, message: string } {
		return {
			caption: 'Wait',
			message: 'Loading Values List...'
		}
	}

	protected getApi(): ApiValuesProxy {
		return Api.Values();
	}


}

export default ValuesController;