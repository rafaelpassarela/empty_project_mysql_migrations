import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

// Available pages
import HomePage from '../pages/home.page.component';
import AboutPage from '../pages/about.page.component';
import Error404Page from '../pages/notfound404.page.component';

//<Route exact path="/" render={() => (
//    <h1>You're at Home</h1>
//)} />

class RouterPlaceHolder extends React.Component {

	render() {

		return (
			<div>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/about" component={AboutPage} />
					<Route component={Error404Page} />
				</Switch>
			</div>
		);

	}

}

export default RouterPlaceHolder;