//import * as React from 'react';
import BaseViewDetailComponent from '../../components/base.view.detail.component';
import Api from '../../client-api/api';
import { ViewDetailItem } from '../../components/base.view.types';
import { Values } from '../../client-api/api-models';


class ValuesDetailComponent extends BaseViewDetailComponent<Values> {

	// constructor(props: any) {
	// 	super(props);
	// }

	protected getPageTitle(): string {
		return 'Value Detail' ;
	}

	protected getDescription(): string {
		return 'Detailed info about Value ID ' + this.getParamID();
	}

	protected getLoadindMessage(): string {
		return 'Loading Record Details...';
	}

	protected getViewItemsList() : Array<ViewDetailItem> {
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
					max: 999,
					validationMessages: {
						invalidMessage: "The ID value is mandatory",
						validMessage: "Ok"
					}
				}
			}, {
				required: true, 
				fieldName: "Name",
				caption: "Description",
				type: "text",
				placeHolder: "Value Name",
				options: {
					maxLength: 20,
					validationMessages: {
						invalidMessage: "Please, provide a Value Name",
						validMessage: "Ok"
					}
				}
			}
		];
	}

	protected onGetItem(key: any): Promise<Values>{
		return new Promise<Values>((resolve, reject) => {
			Api.Values().Values_Get(
				(data: any) => {
					resolve(data);
				},
				(error: Error) => {
					reject(error)
				},
				key);
		});
	}

	protected onSaveItem(item: Values): Promise<Values>{
		return new Promise<Values>((resolve, reject) => {
			Api.Values().Values_Post(
				(data: any) => {
					resolve(data);
				},
				(error: Error) => {
					reject(error);
				},
				item
			);
		});
	};

}

export default ValuesDetailComponent;
