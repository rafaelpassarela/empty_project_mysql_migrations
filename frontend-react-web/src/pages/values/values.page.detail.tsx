// import * as React from 'react';
import BaseViewDetailComponent from '../../components/base.view.detail.component';
import { Values } from '../../client-api/api-models';


class ValuesDetailComponent extends BaseViewDetailComponent<Values> {

	constructor(props: any) {
		super(props);

		this.state = {
			currentObject: this.props.currentObject
		}
	}

	protected getPageTitle(): string {
		return 'Value Detail' ;
	}

	protected getDescription(): string {
		return 'Detailed info about Value ID ' + this.getParamID();
	}

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
