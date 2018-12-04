import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './inc/App.css';

import RouterPlaceHolder from './helpers/router.place.holder';
// import { InitHistory } from './helpers/history.helper';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';

class App extends React.Component {

	public render() {
		
		// console.log("App.ts LOG test");
		// InitHistory();

		return (
			<Router>				
				<div className="defaultAppStyle" >
					<HeaderComponent />
					<Row>
						<Col lg={12} md={12} sm={12} xs={12}>
							<div className="din-content">
								<RouterPlaceHolder />
							</div>
						</Col>
					</Row>
					<FooterComponent />
				</div>
			</Router>
		);
	}
}

export default App;
