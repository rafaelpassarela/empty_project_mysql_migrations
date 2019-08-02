// import * as React from 'react';
import BaseViewDetailComponent, { ViewDetailItem } from '../../components/base.view.detail.component';
import ApiValuesProxy from '../../client-api/api-values-proxy';
import Api from '../../client-api/api';
import { Values } from '../../client-api/api-models';


class ValuesDetailComponent extends BaseViewDetailComponent<Values> {

	constructor(props: any) {
		super(props);
	}

	protected getPageTitle(): string {
		return 'Value Detail' ;
	}

	protected getDescription(): string {
		return 'Detailed info about Value ID ' + this.getParamID();
	}

	protected getViewItemsList() : ViewDetailItem[] {
		return [
			{
				required: true, 
				fieldName: "Id",
				caption: "Id",
				type: "number",
				disabled: true,
				placeHolder: "Value ID",
				options: {
					min: 0,
					max: 999
				}
			}, {
				required: true, 
				fieldName: "Name",
				caption: "Description",
				type: "text",
				placeHolder: "Value Name",
				options: {
					maxLength: 20
				}
			}
		];
	}

	protected getLoadindMessage(): string {
		return 'Loading Record Details...';
	}

	protected getApi(): ApiValuesProxy {
		return Api.Values();
	};
}

export default ValuesDetailComponent;
