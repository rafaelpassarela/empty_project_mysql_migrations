// import * as React from 'react';
import BaseViewDetailComponent, { ViewItems } from '../../components/base.view.detail.component';
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

	protected getViewItemsList() : ViewItems[] {
		return [
			{required: true, fieldName: "Id", caption: "Id", type: "number"},
			{required: true, fieldName: "Name", caption: "Description", type: "text", maxLength: 20}
		];
	}

	protected getLoadindMessage(): string {
		return 'Loading Record Details...';
	}

	protected getApi(): ApiValuesProxy {
		return Api.Values();
	};

	// protected doRender() : any {
	// 	let obj = this.getCurrentItem();
	// 	let name = (obj != null) ? obj.Name : 'Nao Tem';
	// 	let json = (obj != null) ? JSON.stringify(obj, null, 2) : '{}';

	// 	return (
	// 	<div>
	// 		Get Item ID = <b>{this.getParamID()} </b><hr/>
	// 		Item Name = <b>{name}</b>

	// 		<input value={name} name="Name" onChange={this.handleChange}></input> <br/>

	// 		{json}
	// 	</div>
	// 	);
	// }	

}

export default ValuesDetailComponent;
