import * as React from 'react';
import BaseViewComponent from '../components/base.view.component';
import { Row, Col } from 'react-bootstrap';

import Api from '../client-api/api';

import '../inc/App.css';

class ValuesPage extends BaseViewComponent<{}, { list: any }> {

	constructor(props: any) {
		super(props);
		this.state = { list: [] };
	}

	componentDidMount() {
		super.componentDidMount();
		Api.Values().get(
			this.getData, 
			(error: any) => { console.log('ERROOO: ' + error) });
	}

	protected getTitle(): string {
		return 'Some Values List';
	}

	getData(data: any) {
		console.log("recebimento -> " + data);
		this.setState({ list: data });
	}

	render() {

		const listItems = this.state.list.map((d:any) => <div>{d.Name}</div>);

		return (
			<div>
				<Row><Col md={6}>
					<h3>Some Values Simple List</h3>
					Test: {listItems}
				</Col></Row>
			</div>
		);
	}

}

export default ValuesPage;