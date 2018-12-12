import * as React from 'react';
import BaseViewComponent from '../components/base.view.component';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { setUser, getUser, removeUser } from '../helpers/cookie.helper';

class HomePage extends BaseViewComponent {

	protected getTitle(): string {
		return 'Home';
	}

	handleSave = () => {
		setUser('Luke');
	};

	handleLoad = () => {
		var name = getUser();
		if (name != undefined)
			window.alert(name);
		else
			window.alert('save first!');
		removeUser();
	}

	public render() {
		return (
			<div>
				<p>
					This is the default page! <br />
					We use Boostrap. <br />
					<Button bsStyle="primary" onClick={this.handleSave}>Save Cookie</Button>&nbsp;
					<Button bsStyle="success" onClick={this.handleLoad}>Load Cookie</Button>
				</p>
				To <Link to="/about">About</Link> Page. <br />
				To <Link to="/PageNotFound">An Error (404)</Link> Page.<br />
			</div>
		);
	}
}

export default HomePage;