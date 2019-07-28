import * as React from 'react';
import BaseViewComponent from './base.view.component';
import { BaseModel } from '../client-api/api-models';
import { RouteComponentProps } from 'react-router-dom';

interface IBaseViewDetailComponentProps<T extends BaseModel> extends RouteComponentProps {
	id: any,
	currentObject: T | null
}

interface IBaseViewDetailComponentState<T extends BaseModel> extends React.Props<IBaseViewDetailComponentState<T>> {
	currentObject: T | null
}

abstract class BaseViewDetailComponent<T extends BaseModel> 
	extends BaseViewComponent<IBaseViewDetailComponentProps<T>, IBaseViewDetailComponentState<T>> {

	constructor(props: any) {
		super(props);

		this.getParamID = this.getParamID.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getCurrentItem = this.getCurrentItem.bind(this);
		this.getHeader = this.getHeader.bind(this);
	}

	protected abstract getPageTitle(): string;
	protected abstract getDescription(): string;

	protected getCurrentItem() : T {
		let obj : T;
		obj = (this.state.currentObject || this.props.currentObject) as T;
		return obj;
	}

	getHeader = () => {
		let textDesc = this.getDescription();
		let textCaption = this.getPageTitle();

		let description = (textDesc != '') ? <small><small>{textDesc}</small></small> : null;

		return (textCaption != '') ? <h2>{textCaption} {description}</h2> : null;
	}	

	handleChange(event: any) {
		
		let ccc = {} as T;
		let obj = this.props.currentObject || ccc;
		obj[event.target.name] = event.target.value;

		this.setState({
			currentObject: obj
		});
		
	}

	getParamID = () => {
		return this.props.match.params['id'] | this.props.id;
	}

	protected doRender() : any {
		return (
			<div>
				{this.getHeader()}
			</div>
		);
	}

}

export default BaseViewDetailComponent;
