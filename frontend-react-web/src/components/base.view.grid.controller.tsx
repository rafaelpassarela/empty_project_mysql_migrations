import * as React from 'react';
import LocalizationConfig from '../configurations/localization.config';
import BaseViewComponent, { IBaseViewProps } from './base.view.component';
// Api
import ApiBase from '../client-api/api-base';
import { BaseModel } from '../client-api/api-models';
// Controls
import MessageBox from './message.box.component';
import Loading from './loading.component';
import Grid from './grid.component';
import DeleteModal from './delete.modal.component';

export interface IBaseControllerProps extends IBaseViewProps{};

export interface IBaseControllerState<T extends BaseModel> extends React.Props<IBaseControllerState<T>> {
	list: Array<T>,
	currentObject: T | null,	
	isLoading: boolean,
	errorMsg: string | undefined,
	message: string | undefined,
	showDeleteConfirmation: boolean,
	showEditComponent: boolean
}

export class BaseLoadingInfo {
	caption: string;
	message: string;
}

export class BaseColumnInfo {
	fieldName: string;
	isKey?: boolean;
	fieldCaption?: string;
	fieldSize?: string | number | undefined;
}

// abstract class BaseViewGridController<T extends BaseModel> extends 
// React.Component<{}, IBaseControllerState<T>> {
abstract class BaseViewGridController<
	T extends BaseModel,
	P extends IBaseControllerProps,
	S extends IBaseControllerState<T>> extends BaseViewComponent<P, S> {

	// abstract methods
	protected abstract getPageTitle(): string;
	protected abstract getDescription(): string;
	protected abstract getLoadindInfo(): BaseLoadingInfo;
	protected abstract getColumnInfo(): BaseColumnInfo[];	
	protected abstract getApi(): ApiBase<T>;
	protected abstract getCurrentItemAsString(object: T): string;
	
	protected getColumnID(): string {
		return 'Id';
	}

	protected onRederRow(data: Object): string {
		// if (data == undefined)
		// 	return "badge-danger";
		// if (data['Id'] == "4")
		// 	return "badge-warning";

		return "";
	}

	protected onRenderColumn(field: string, value: any) : string {
		// if (field == 'Id' && value == '2')
		// 	return "badge-danger";
		// if (field == 'Name' && value.indexOf("Value") >= 0)
		// 	return "badge-success";

		return "";
	}

	constructor(props: any) {
		super(props);

		this.state = {
			...props,
			list: [],
			errorMsg: '',
			message: '',
			isLoading: true,
			showDeleteConfirmation: false,
			showEditComponent: false,
			currentObject: null
		};

		this.loadList = this.loadList.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.initErrorMessage = this.initErrorMessage.bind(this);
		this.initInfoMessage = this.initInfoMessage.bind(this);
		this.getHeader = this.getHeader.bind(this);
		this.getGrid = this.getGrid.bind(this);
		this.getDeleteConfirmation = this.getDeleteConfirmation.bind(this);
		this.getDeleteTextMessage = this.getDeleteTextMessage.bind(this);
		this.handleDeleteClose = this.handleDeleteClose.bind(this);
		this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
	}	

	componentDidMount() {
		let name = this.getPageTitle();
		if (name != '') {
			name = ' - ' + name;
		}

		document.title = LocalizationConfig.companyName + name;

		this.loadList();
	}

	loadList = () => {
		this.getApi().get(
			(data: any) => {
				this.setState({
					list: data,
					isLoading: false,
					errorMsg: undefined,
					message: undefined,
				});
			},
			(error: Error) => {
				this.setState({
					list: [],
					isLoading: false,
					message: undefined,
					errorMsg: error.message
				});
			}
		);
	}

    getDeleteTextMessage = (object: T) : string => {
    	return LocalizationConfig.deleteConfirmation + '\n' + this.getCurrentItemAsString(object);
    }

	getHeader = () => {
		let textDesc = this.getDescription();
		let textCaption = this.getPageTitle();

		let description = (textDesc != '') ? <small><small>{textDesc}</small></small> : null;

		return (textCaption != '') ? <h2>{textCaption} {description}</h2> : null;
	}

	initLoading = () => {
		const info = this.getLoadindInfo();

		return (
			<Loading
				active={this.state.isLoading}
				caption={info.caption}
				message={info.message}
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

	onDelete = (data : Object) => {
		this.setState({
			errorMsg: undefined,
			message: undefined,
			showDeleteConfirmation: true,
			currentObject: data as T
		})
	}

	handleDeleteClose = () => {
		this.setState({
			showDeleteConfirmation: false,
			currentObject: null,
			errorMsg: undefined,
			message: undefined
		})
	}

	handleDeleteBtnClick = () => {
		let key = '';
		this.getColumnInfo().filter((value: BaseColumnInfo) => {
			if (value.isKey == true) {
				key = (this.state.currentObject != null) ? this.state.currentObject[value.fieldName] : '';
				return true;
			} else
				return false;
			}
		);

		this.getApi().delete(
			(data: any) => {
				// remove the deleted element from the list
				let newList = [...this.state.list];
				let idx = newList.indexOf(this.state.currentObject as T);				
				if (idx != -1) {
					newList.splice(idx, 1);				
				}

				this.setState({
					list: newList,
					isLoading: false,
					errorMsg: undefined,
					message: LocalizationConfig.itemWasDeleted + '\n' + this.getCurrentItemAsString(this.state.currentObject as T),
					currentObject: null,
					showDeleteConfirmation: false,
				});
			},
			(error: Error) => {
				this.setState({					
					isLoading: false,
					errorMsg: error.message,
					message: undefined,
					currentObject: null,
					showDeleteConfirmation: false,
				});
			},
			'/' + key
		);		
	}

	getDeleteConfirmation = () => {
		let modal = null;

		if (this.state.showDeleteConfirmation) {
			modal = <DeleteModal
				show={this.state.showDeleteConfirmation}				
				text={this.getDeleteTextMessage(this.state.currentObject as T)}
				onHandleClose={this.handleDeleteClose}
				onHandleDelete={this.handleDeleteBtnClick}
			/>
		}

		return modal;
	}

	getGrid = () => {
		let grid = 
				<Grid
					Columns={this.getColumnInfo()}
					KeyField="Id"
					DataSource={this.state.list}
					OnRenderRow={this.onRederRow}
					OnRenderColumn={this.onRenderColumn}
					Actions={["delete", "insert", "update"]}
					//OnInsert={() => alert('msg on other page!')}
					OnDelete={this.onDelete}
					//OnUpdate={(data: Object) => alert('Update "' + data['Name'] + '"?')} 
				/>;

		return grid;
	}

	protected doRender() : any {
		const loading = this.initLoading();
		const error = this.initErrorMessage();
		const message = this.initInfoMessage();		
		const deleteConfirmation = this.getDeleteConfirmation();

		return (

			<div>
				{loading}
				{error}
				{message}
				{deleteConfirmation}
				{this.getHeader()}
				{this.getGrid()}
			</div>
		)
	}

}

export default BaseViewGridController;