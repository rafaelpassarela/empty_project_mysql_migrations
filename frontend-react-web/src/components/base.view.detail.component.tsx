import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LocalizationConfig from '../configurations/localization.config';
import BaseViewComponent from './base.view.component';
// Api
import ApiBase from '../client-api/api-base';
import { BaseModel } from '../client-api/api-models';
// Controls
import Loading from './loading.component';
import MessageBox from './message.box.component';


interface IBaseViewDetailComponentProps<T extends BaseModel> extends RouteComponentProps {
	id: any,
	currentObject: T | null
}

interface IBaseViewDetailComponentState<T extends BaseModel> extends React.Props<IBaseViewDetailComponentState<T>> {
	currentObject: T | null,
	isLoading: boolean,
	errorMsg: string | undefined,
	message: string | undefined,	
}

export class ViewItems {
	fieldName: string;
	caption: string;
	type: 'text' | 'number' | 'combo' | 'date' | 'checkbox' | 'radio';
	required?: Boolean;
	enabled?: Boolean;
	maxLength?: number;
}

abstract class BaseViewDetailComponent<T extends BaseModel> 
	extends BaseViewComponent<IBaseViewDetailComponentProps<T>, IBaseViewDetailComponentState<T>> {

	constructor(props: any) {
		super(props);

		this.state = {
			currentObject: this.props.currentObject,
			isLoading: true,
			errorMsg: '',
			message: ''
		}

		this.getCurrentItem = this.getCurrentItem.bind(this);
		this.loadDetailObject = this.loadDetailObject.bind(this);
		this.getHeader = this.getHeader.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getParamID = this.getParamID.bind(this);
		this.initLoading = this.initLoading.bind(this);
	}

	protected abstract getPageTitle(): string;
	protected abstract getDescription(): string;
	protected abstract getViewItemsList() : ViewItems[];
	protected abstract getLoadindMessage(): string;
	protected abstract getApi(): ApiBase<T>;

	protected getCurrentItem() : T {
		let obj : T;
		obj = (this.state.currentObject || this.props.currentObject) as T;
		return obj;
	}

	componentDidMount() {
		super.componentDidMount();

		let id = this.getParamID();
		if (id != undefined) {
			this.loadDetailObject(id);
		} else {
			this.setState({
				isLoading: false,
				message: '',
				errorMsg: ''
			});
		}
	}

	loadDetailObject = (id: any) => {
		this.getApi().get(
			(data: any) => {
				this.setState({
					currentObject: data,
					isLoading: false,
					errorMsg: undefined,
					message: undefined,
				});
			},
			(error: Error) => {
				this.setState({					
					isLoading: false,
					message: undefined,
					errorMsg: error.message
				});
			},
			'/' + id
		);
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

	initLoading = () => {
		return (
			<Loading
				active={this.state.isLoading}
				caption={LocalizationConfig.waitCaption}
				message={this.getLoadindMessage()}
				variant="primary" />
		)
	}

	initErrorMessage = () => {
		// create the ErrorBox component
		if (this.state.errorMsg != '' && this.state.errorMsg != undefined) {
			return <MessageBox message={this.state.errorMsg} caption={LocalizationConfig.error} msgType='error' mode='dynamic'/>;
		} else {
			return null;
		}
	}

	initInfoMessage = () => {
		// create the InfoBox component
		if (this.state.message != '' && this.state.message != undefined) {
			return <MessageBox message={this.state.message} caption={LocalizationConfig.attention} msgType='info' mode='dynamic' />;
		} else {
			return null;
		}
	}	

	protected doRender() : any {
		const loading = this.initLoading();
		const error = this.initErrorMessage();
		const message = this.initInfoMessage();

		return (

			<div>
				{loading}
				{error}
				{message}
				{this.getHeader()}
			</div>
		)
	}

}

export default BaseViewDetailComponent;