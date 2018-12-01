import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './inc/App.css';

import RouterPlaceHolder from './helpers/router.place.holder';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';

class App extends React.Component {
	public render() {
		return (
			<Router>
				<div className="defaultAppStyle">
					<HeaderComponent />
					<div className="din-content">
						<RouterPlaceHolder />
					</div>
					<FooterComponent />
				</div>
			</Router>
		);
	}
}

export default App;
