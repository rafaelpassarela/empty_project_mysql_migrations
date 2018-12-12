import * as React from 'react';
import BaseViewComponent from '../components/base.view.component';
import { Row, Col } from 'react-bootstrap';

import '../inc/App.css';

class ValuesPage extends BaseViewComponent {

	constructor(props: any) {
		super(props);


	}

	componentDidMount() {
		super.componentDidMount();
	}

	protected getTitle(): string {
		return 'Pets';
	}

	render() {

		return (
			<div>
				<Row><Col md={6}>
					<h3>Some Values Simple List</h3>
					List Here
				</Col></Row>
			</div>
		);
	}

}

export default ValuesPage;