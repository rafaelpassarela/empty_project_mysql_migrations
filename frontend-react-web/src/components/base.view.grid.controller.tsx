import * as React from 'react';
import LocalizationConfig from '../configurations/localization.config';
import BaseViewComponent, { IBaseViewProps } from './base.view.component';
// Api
import { BaseModel } from '../client-api/api-models';
// Controls
import MessageBox from './message.box.component';
import Loading from './loading.component';
import Grid from './grid.component';
import DeleteModal from './delete.modal.component';
import Badge from 'react-bootstrap/Badge';
import Glyphicon from './glyphicon.component';

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
	protected abstract getLoadindMessage(): string;
	protected abstract getColumnInfo(): BaseColumnInfo[];
	protected abstract getCurrentItemAsString(object: T): string;
	protected abstract getDetailClassName(): any;
	protected abstract onGetAllItems(): Promise<T[]>;
	protected abstract onDeleteItem(key: any): Promise<boolean>;
	
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
		this.onEdit = this.onEdit.bind(this);
		this.onInsert = this.onInsert.bind(this);
		this.initErrorMessage = this.initErrorMessage.bind(this);
		this.initInfoMessage = this.initInfoMessage.bind(this);
		this.getHeader = this.getHeader.bind(this);
		this.getGrid = this.getGrid.bind(this);
		this.getDeleteConfirmation = this.getDeleteConfirmation.bind(this);
		this.getDeleteTextMessage = this.getDeleteTextMessage.bind(this);
		this.getEditingForm = this.getEditingForm.bind(this);
		this.getCurrentObjectKey = this.getCurrentObjectKey.bind(this);
		this.handleDeleteClose = this.handleDeleteClose.bind(this);
		this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
		this.handleRefreshBtnClick = this.handleRefreshBtnClick.bind(this);
		this.editFormOnCloseCallback = this.editFormOnCloseCallback.bind(this);
		this.editFormOnSaveCallback = this.editFormOnSaveCallback.bind(this);
	}	

	componentDidMount() {
		let name = this.getPageTitle();
		if (name !== '') {
			name = ' - ' + name;
		}

		document.title = LocalizationConfig.companyName + name;

		this.loadList();
	}

	loadList = () => {
		this.onGetAllItems()
			.then( (items: T[]) => {
				this.setState({
					list: items,
					isLoading: false,
					errorMsg: undefined,
					message: undefined
				});
			})
			.catch( (error: Error) => {
				this.setState({
					list: [],
					isLoading: false,
					message: undefined,
					errorMsg: error.message
				});
			});
	}

    getDeleteTextMessage = (object: T) : string => {
    	return LocalizationConfig.deleteConfirmation + '\n' + this.getCurrentItemAsString(object);
    }

	getHeader = () => {
		let textDesc = this.getDescription();
		let textCaption = this.getPageTitle();

		let description = (textDesc !== '') ? <small><small>{textDesc}</small></small> : null;

		if (textCaption === '') {
			return null
		}

		let reloadBtn = (
			<span>
				<Badge style={{cursor: 'pointer'}} bg="info" onClick={() => this.handleRefreshBtnClick()}>
					<Glyphicon glyph="sync-alt" />
				</Badge>	
			</span>
		);

		return (
			<div className="modal-header">				
				<h2>{textCaption} {description}</h2>
				{reloadBtn}
			</div>
		);
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
		if (this.state.errorMsg !== '' && this.state.errorMsg !== undefined) {
			return <MessageBox message={this.state.errorMsg} caption={LocalizationConfig.error} msgType='error' mode='dynamic'/>;
		} else {
			return null;
		}
	}

	initInfoMessage = () => {
		// create the InfoBox component
		if (this.state.message !== '' && this.state.message !== undefined) {
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

	onEdit = (data : Object) => {
		this.setState({
			errorMsg: undefined,
			message: undefined,
			showEditComponent: true,
			currentObject: data as T
		})
	}

	onInsert = (data : Object) => {
		this.setState({
			errorMsg: undefined,
			message: undefined,
			showEditComponent: true,
			currentObject: null
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

	getCurrentObjectKey = () : string => {
		let key = '';
		this.getColumnInfo().filter((value: BaseColumnInfo) => {
			if (value.isKey === true) {
				key = (this.state.currentObject != null) ? this.state.currentObject[value.fieldName] : '';
				return key;
			} else
				return '-1';
			}
		);

		return key;
	}

	handleRefreshBtnClick = () => {
		this.setState({
			errorMsg: '',
			message: '',
			isLoading: true,
		}, () => this.loadList());
	}

	handleDeleteBtnClick = () => {
		let key = this.getCurrentObjectKey();
		this.onDeleteItem(key)
			.then((value: boolean) => {
				// remove the deleted element from the list
				let newList = [...this.state.list];
				let idx = newList.indexOf(this.state.currentObject as T);
				if (idx !== -1) {
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
			})
			.catch((error: Error) => {
				this.setState({
					isLoading: false,
					errorMsg: error.message,
					message: undefined,
					currentObject: null,
					showDeleteConfirmation: false,
				});
			});
	}

	editFormOnSaveCallback = (message: string, isError : boolean, dataObject: T | null) => {
		let newList = [...this.state.list];
		// if not error, refresh the current object on the list, or insert a new one
		if (!isError) {
			let idx = newList.indexOf(this.state.currentObject as T);
			if (idx !== -1) {
				newList[idx] = dataObject as T
			} else {
				newList.push(dataObject as T);
			}

			this.setState({
				// errorMsg: isError ? message : undefined,
				// message: isError ? undefined : message,
				// message already show on the detail component
				errorMsg: undefined,
				message: undefined,
				showEditComponent: false,
				currentObject: dataObject,
				list: newList
			});			
		}
	}

	editFormOnCloseCallback = () => {
		this.setState({
			errorMsg: undefined,
			message: undefined,
			showEditComponent: false,
			currentObject: null
		})
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

	getEditingForm = () => {
		if (this.state.showEditComponent) {
			let comp = React.createElement(this.getDetailClassName(), {
				id: this.getCurrentObjectKey(),
				currentObject: this.state.currentObject,
				onSaveCallbackHandle: this.editFormOnSaveCallback,
				onCloseCallbackHandle: this.editFormOnCloseCallback,
				hideDummySpace: true
			});

			return <div>{comp}</div>;
		}

		return null;
	}

	getGrid = () => {
		let grid = 
				<Grid
					columns={this.getColumnInfo()}
					keyField="Id"
					dataSource={this.state.list}
					onRenderRow={this.onRederRow}
					onRenderColumn={this.onRenderColumn}
					actions={["delete", "insert", "update"]}
					onInsert={this.onInsert}
					onDelete={this.onDelete}
					onUpdate={this.onEdit} 
				/>;

		return grid;
	}

	protected doRender() : any {
		const loading = this.initLoading();
		const error = this.initErrorMessage();
		const message = this.initInfoMessage();
		const deleteConfirmation = this.getDeleteConfirmation();
		const editingForm = this.getEditingForm();

		return (
			<div>
				{loading}
				{error}
				{message}
				{deleteConfirmation}
				{editingForm}
				{this.getHeader()}
				<div className="modal-body">{this.getGrid()}</div>
			</div>
		)
	}

}

export default BaseViewGridController;