import * as React from 'react';
// Api
import ApiBase from '../client-api/api-base';
import { BaseModel } from '../client-api/api-models';
// Controls
import ErrorBox from './error.box.component';
import Loading from './loading.component';
import PageFrame from './pageframe.component';
import Grid from './grid.component';
// import Grid from './grid.component';
// import ModalWindow from './modalwindow.component';

interface IBaseControllerState<T extends BaseModel> extends React.Props<IBaseControllerState<T>> {
	list: Array<T>,
	isLoading: boolean,
	errorMsg: string,
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

	protected getTitle(): string {
		return '';
	}

	protected getColumnID(): string {
		return 'Id';
	}

	constructor(props: any) {
		super(props);

		this.state = {
			list: [],
			errorMsg: '',
			isLoading: true,
		};
	}

	componentDidMount() {
		let name = this.getTitle();
		if (name != '') {
			name = ' - ' + name;
		} else {
			console.error('Component Page "' + this.constructor.name + '" doesn\'t have "protected getTitle() : string" function.');
		}

		document.title = 'Mr Rafael.ca' + name;

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
		const error = <ErrorBox errorMessage={this.state.errorMsg} caption="Error!" icon="exclamation-circle" mode="dynamic" />;
		return error;
	}

	getGrid = () => {

		let grid = <Grid
					Columns={this.getColumnInfo()}
					KeyField="Id"
					DataSource={this.state.list}
					// OnRenderRow={this.onRederRow}
					//OnRenderColumn={this.onRenderColumn}
					Actions={["delete", "insert", "update"]}
					//OnInsert={() => alert('msg on other page!')}
					//OnDelete={this.onDelete}
					//OnUpdate={(data: Object) => alert('Update "' + data['Name'] + '"?')} 
					/>;

		return grid;
	}

	render() {
		const loading = this.initLoading();
		const error = this.initErrorMessage();
		const message = null;

		return (
			<PageFrame>
				{loading}{error}{message}
				{this.getHeader()}
				{this.getGrid()}
			</PageFrame>		        
		)
	}

}

export default BaseController;