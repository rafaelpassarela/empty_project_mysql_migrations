import BaseViewDetailComponent from '../../components/base.view.detail.component';
import { ViewDetailItem } from '../../components/base.view.types';
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

	protected getLoadindMessage(): string {
		return 'Loading Record Details...';
	}

	protected getApi(): ApiValuesProxy {
		return Api.Values();
	};

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

}

export default ValuesDetailComponent;
