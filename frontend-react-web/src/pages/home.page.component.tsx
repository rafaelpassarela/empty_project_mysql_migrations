import * as React from 'react';
import BaseViewComponent from '../components/base.view.component';
import PageFrame from '../components/pageframe.component';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { setUser, getUser, removeUser } from '../helpers/cookie.helper';

class HomePage extends BaseViewComponent {

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

	toastTest = () => {
		toast.success("Success Notification !");
	}

	public render() {
		return (
			<PageFrame>
				<p>
					This is the default page! <br />
					We use Boostrap. <br />
					<Button bsStyle="primary" onClick={this.handleSave}>Save Cookie</Button>&nbsp;
					<Button bsStyle="success" onClick={this.handleLoad}>Load Cookie</Button>
					<br/><br/>
					<Button onClick={this.toastTest}>Toast Test</Button>
				</p>
				To <Link to="/about">About</Link> Page. <br />
				To <Link to="/PageNotFound">An Error (404)</Link> Page.<br />
			</PageFrame>
		);
	}
}

export default HomePage;