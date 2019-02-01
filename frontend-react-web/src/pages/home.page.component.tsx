import * as React from 'react';
import BaseViewComponent from '../components/base.view.component';
import PageFrame from '../components/pageframe.component';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
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

	protected getTitle(): string {
		return 'Home Page';
	}

	renderLeft = () => {
		return (
			<div>
				Test of Left Part of Screen
			</div>
		);
	}

	renderRight = () => {
		return (
			<div>
				Test of Right Part of Screen
			</div>
		);
	}

	public render() {
		return (
			<PageFrame
				onRenderLeft={this.renderLeft}
				onRenderRight={this.renderRight}
				>
				<p>
					This is the default page! <br />
					We use Boostrap. <br />
					<Button variant="outline-primary" onClick={this.handleSave}>Save Cookie</Button>&nbsp;
					<Button variant="outline-success" onClick={this.handleLoad}>Load Cookie</Button>
					<br /><br />
					<Button onClick={this.toastTest}>Toast Test</Button>
				</p>
				To <Link to="/about">About</Link> Page. <br />
				To <Link to="/PageNotFound">An Error (404)</Link> Page.<br />
			</PageFrame>
		);
	}
}

export default HomePage;