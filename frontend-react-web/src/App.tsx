import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RegisterGlyph } from './configurations/glyph.register';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// all site styles
import './inc/App.css';
import 'react-toastify/dist/ReactToastify.css';

// site initializers 
import RouterPlaceHolder from './helpers/router.place.holder';
// import { InitHistory } from './helpers/history.helper';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';

class App extends React.Component {

	constructor(props: any) {
		super(props);

		RegisterGlyph();
	}

	public render() {

		// InitHistory();

		return (
			<Router>
				<div className="defaultAppStyle" >
					<HeaderComponent />
					<Row style={{ 'marginRight': -10 }}>
						<Col lg={12} md={12} sm={12} xs={12}>
							<div className="din-content">
								<RouterPlaceHolder />
							</div>
						</Col>
					</Row>
					<ToastContainer
						position="bottom-center"
						autoClose={6000}
						hideProgressBar={false}
						newestOnTop
						closeOnClick
						rtl={false}
						draggable
						pauseOnHover={false}
					/>
					<FooterComponent />
				</div>
			</Router>
		);
	}
}

export default App;
