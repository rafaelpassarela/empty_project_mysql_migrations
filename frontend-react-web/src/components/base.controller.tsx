import * as React from 'react';
// Api
import ApiBase from '../client-api/api-base';
import { BaseModel } from '../client-api/api-models';
// Controls
// import ErrorBox from './error.box.component';
import Loading from './loading.component';
// import Grid from './grid.component';
// import ModalWindow from './modalwindow.component';

interface IBaseControllerState<T extends BaseModel> extends React.Props<IBaseControllerState<T>> {
	list: Array<T>,
	isLoading: boolean,
	errorMsg: string,
}

abstract class BaseController<T extends BaseModel> extends React.Component<{}, IBaseControllerState<T>> {

	// abstract methods
	protected abstract getCaption(): string;
	protected abstract getDescription(): string;
	protected abstract getLoadindInfo(): { caption: string, message: string };
	protected abstract getApi(): ApiBase<T>;

	constructor(props: any) {
		super(props);

		this.state = {
			list: [],
			errorMsg: '',
			isLoading: true,
		};
	}

	componentDidMount() {
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
		let description = (this.getDescription() != '') ? <small><small>{this.getDescription()}</small></small> : null;
		return (this.getCaption() != '') ? <h2>{this.getCaption()} {description}</h2> : null;
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

	render() {
		const loading = this.initLoading();
		const error = null;
		const message = null;

		return (
			<div>
				{loading}{error}{message}
				{this.getHeader()}
			</div>
		)
	}

}

export default BaseController;