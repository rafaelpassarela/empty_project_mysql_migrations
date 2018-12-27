import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import BaseViewComponent from '../components/base.view.component';
import ErrorBox, { ErrorMode } from '../components/error.box.component';
import Loading from '../components/loading.component';
import Grid from '../components/grid.component';

import Api from '../client-api/api';
import { Values } from '../client-api/api-models';

import '../inc/App.css';

type ValuesPageState = {
	list: Values[],
	isLoading: boolean,
	errorMsg: string
};

class ValuesPage extends BaseViewComponent<{}, ValuesPageState> {

	constructor(props: any) {
		super(props);

		this.getData = this.getData.bind(this);

		this.state = {
			list: [],
			errorMsg: '',
			isLoading: true
		};
	}

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

	protected getTitle(): string {
		return 'Some Values List';
	}

	getData(data: any) {
		console.log("recebimento -> " + data);

	}

	render() {
		// create the Loading Indicator component
		const loading = <Loading active={this.state.isLoading} />
		// create the ErrorBox component
		const error = <ErrorBox errorMessage={this.state.errorMsg} caption="Sorry!" icon="exclamation-sign" mode={ErrorMode.EM_DYNAMIC} />

		const columns = [
			{ Field: 'Id', Title: 'Code' },
			{ Field: 'Name', Title: 'Value Name' }
		];

		return (
			<div>
				{loading}{error}
				<Row><Col md={6}>
					<h3>Some Values Simple List</h3>
					<Grid Columns={columns} DataSource={this.state.list} />
				</Col></Row>

			</div>
		);
	}

}

export default ValuesPage;