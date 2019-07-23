import * as React from 'react';
import BaseViewComponent from '../../components/base.view.component';
import { RouteComponentProps } from 'react-router-dom'

interface IValuesDetailComponentState extends RouteComponentProps {
	id: any
}

class ValuesDetailComponent extends BaseViewComponent<IValuesDetailComponentState, {loadId: string}> {

	constructor(props: any) {
		super(props);

		this.state = {
			loadId: this.props.match.params['id']
		}
	}

	protected getTitle(): string {
		return 'Value ID ' + this.state.loadId;
	}

	protected doRender() : any {
		return <div>Teste ID = {this.state.loadId}</div>
	}	

}

export default ValuesDetailComponent;
