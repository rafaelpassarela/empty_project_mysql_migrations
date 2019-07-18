import * as React from 'react';
import LocalizationConfig from '../configurations/localization.config';
// Api
import ApiBase from '../client-api/api-base';
import { BaseModel } from '../client-api/api-models';
// Controls
import ErrorBox from './error.box.component';
import Loading from './loading.component';
import PageFrame from './pageframe.component';
import Grid from './grid.component';
import DeleteModal from './delete.modal.component';
import {IModalWindowProps} from './modalwindow.component';

interface IBaseControllerState<T extends BaseModel> extends React.Props<IBaseControllerState<T>> {
	list: Array<T>,
	currentObject: T | null,	
	isLoading: boolean,
	errorMsg: string,
	showDeleteConfirmation: boolean,
	showEditComponent: boolean
}

export class BaseLoadingInfo {
	caption: string;
	message: string;
}

export class BaseColumnInfo {
	fieldName: string;
	fieldCaption?: string;
	fieldSize?: string | number | undefined;
}

abstract class BaseController<T extends BaseModel> extends React.Component<{}, IBaseControllerState<T>> {

	// abstract methods
	protected abstract getCaption(): string;
	protected abstract getDescription(): string;
	protected abstract getLoadindInfo(): BaseLoadingInfo;
	protected abstract getColumnInfo(): BaseColumnInfo[];	
	protected abstract getApi(): ApiBase<T>;
	protected abstract getTitle(): string;

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

	private messageOptions = {} as IModalWindowProps;

	constructor(props: any) {
		super(props);

		this.state = {
			list: [],
			errorMsg: '',
			isLoading: true,
			showDeleteConfirmation: false,
			showEditComponent: false,
			currentObject: null
		};

		this.messageOptions.caption = "teste";
	}

	componentDidMount() {
		let name = this.getTitle();
		if (name != '') {
			name = ' - ' + name;
		}

		document.title = LocalizationConfig.companyName + name;

		this.getApi().get(
			(data: any) => {
				this.setState({
					list: data,
					isLoading: false,
					errorMsg: ''
				});
			},
			(error: Error) => {
				this.setState({
					list: [],
					isLoading: false,
					errorMsg: error.message
				});
			}
		);
	}

	getHeader = () => {
		let textDesc = this.getDescription();
		let textCaption = this.getCaption();

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
		if (this.state.errorMsg != "" && this.state.errorMsg != undefined) {
			return <ErrorBox errorMessage={this.state.errorMsg} caption="Error!" icon="exclamation-circle" mode="dynamic" />;
		} else {
			return null;
		}
	}

	onDelete = (data : Object) => {
		this.setState({
			showDeleteConfirmation: true,
			currentObject: data as T
		})
	}

	getDeleteConfirmation = () => {
		return (
			<DeleteModal
				show={this.state.showDeleteConfirmation}
				text="Badanha"
			/>);
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

	render() {
		const loading = this.initLoading();
		const error = this.initErrorMessage();
		const message = null;
		const deleteConfirmation = (this.state.showDeleteConfirmation) ? this.getDeleteConfirmation() : null ;

		return (
			<PageFrame>
				{loading}{error}{message}{deleteConfirmation}
				{this.getHeader()}
				{this.getGrid()}
			</PageFrame>		        
		)
	}

}

export default BaseController;