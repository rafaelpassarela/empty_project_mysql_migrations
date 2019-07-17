import * as React from 'react';
import BaseViewComponent from '../../components/base.view.component';
import PageFrame from '../../components/pageframe.component';
import ErrorBox from '../../components/error.box.component';
import Loading from '../../components/loading.component';
import Grid from '../../components/grid.component';
import ModalWindow from '../../components/modalwindow.component';
import { ButtonType } from '../../configurations/button.config';

import Api from '../../client-api/api';
import { Values } from '../../client-api/api-models';

import '../../inc/App.css';

interface IValuesPageOLDState extends React.Props<IValuesPageOLDState> {
	list: Values[],
	isLoading: boolean,
	errorMsg: string,
	msgShow: boolean,
	msgCaption?: string,
	msgText?: string,
	msgButtons?: Array<ButtonType>,
	msgCallbak?: (btnType: ButtonType) => void
	// msgButton?: any
};

class ValuesPageOLD extends BaseViewComponent<{}, IValuesPageOLDState> {

// -------------------------------------
	constructor(props: any) {
		super(props);

		this.state = {
			list: [],
			errorMsg: '',
			isLoading: true,
			msgShow: false
		};
	}
// -------------------- OK 	

// --------------------------
	componentDidMount() {
		super.componentDidMount();
		Api.Values().get(
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
// ------------------------- OK

// ------------------------------
	protected getTitle(): string {
		return 'Some Values List';
	}
// ---------------------------- OK	

// ------------------------------
	onRederRow = (data: Object) => {
		if (data == undefined)
			return "badge-danger";
		if (data['Id'] == "4")
			return "badge-warning"

		return "";
	}
// ------------------------------ OK	

// ------------------------------
	onRenderColumn = (field: string, value: any) => {
		if (field == 'Id' && value == '2')
			return 'badge-danger';
		if (field == 'Name' && value.indexOf("Value") >= 0)
			return 'badge-success';
		return '';
	}
// ------------------------------ Ok	

	showMessage = (caption: string, text: string, buttons: Array<ButtonType>, callback: any) => {
		this.setState({
			msgShow: true,
			msgCaption: caption,
			msgText: text,
			msgButtons: buttons,
			msgCallbak: callback
		});
	}

	onDelete = (data: Object) => {
		let eleName = data['Id'] + ' - ' + data['Name'];
		this.showMessage('Delete Record', 'Do you really want to remove ' + eleName + '?', [ButtonType.BTN_YES, ButtonType.BTN_NO],
			(btnType: ButtonType) => {
				alert('Done (fake)');
				this.setState({ msgShow: false });
				// 	let id = data['Id'];
				// 	this.setState({ msgShow: false });
				// 	if (btnType == ButtonType.BTN_YES) {

				// 		Api.Values().delete(

				// (data: any) => {
				// 	this.setState({
				// 		list: data,
				// 		isLoading: false,
				// 		errorMsg: ''
				// 	});
				// },
				// (error: Error) => {
				// 	this.setState({
				// 		list: [],
				// 		isLoading: false,
				// 		errorMsg: error.message
				// 	});
				// }
				// 		                    )

				// 	}
			});
	}

	render() {
		// --------------------
		const loading = <Loading
			active={this.state.isLoading}
			caption="Wait..."
			message="We Are Loading some Values..."
			variant="primary" />
		// -------------------- OK

		// --------------------
		// create the ErrorBox component
		const error = <ErrorBox errorMessage={this.state.errorMsg} caption="Sorry!" icon="exclamation-circle" mode="dynamic" />
        // -------------------- OK

		// create the message place holder
		const message = <ModalWindow
			show={this.state.msgShow}
			caption={this.state.msgCaption}
			text={this.state.msgText}
			closeButton={false}
			buttonList={this.state.msgButtons}
			onHandleClose={() => this.setState({ msgShow: false })}
			onHandleBtnClick={this.state.msgCallbak} />

		const columns = [
			{ fieldName: 'Id', fieldCaption: 'Code' },
			{ fieldName: 'Name', fieldCaption: 'Value Name' }
		];

		return (
			<PageFrame>
				{loading}{error}{message}
				<h2>Some Values List</h2>
				<Grid
					Columns={columns}
					KeyField="Id"
					DataSource={this.state.list}
					OnRenderRow={this.onRederRow}
					OnRenderColumn={this.onRenderColumn}
					Actions={["delete", "insert", "update"]}
					OnInsert={() => alert('msg on other page!')}
					OnDelete={this.onDelete}
					OnUpdate={(data: Object) => alert('Update "' + data['Name'] + '"?')} />

				<small>
					Row of Id 4 will be yellow.<br />
					Cell of Id 2 will be red.<br />
					Cell with Value containning "Value" will be green.
				</small>
			</PageFrame>
		);
	}

}

export default ValuesPageOLD;