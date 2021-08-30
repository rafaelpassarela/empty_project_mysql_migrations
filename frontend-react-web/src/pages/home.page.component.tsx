import * as React from 'react';
import BaseViewComponent, { IBaseViewProps } from '../components/base.view.component';
import Button from 'react-bootstrap/Button';
import Glyphicon from '../components/glyphicon.component';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { cookieStorage } from '../helpers/cookie.helper';
import { TokenResult } from '../client-api/api-models';
import Api from '../client-api/api';

class HomePage<P extends IBaseViewProps, S = {}> extends BaseViewComponent<P, S> {

	handleSave = () => {
		let val = prompt("Token:");
		let token = new TokenResult();
		token.access_token = val as string;
		token.expires_in = 86399;
		token.expires = "Tue, 01 Oct 2019 00:42:35 GMT";
		token.issued = "Mon, 30 Sep 2019 00:42:35 GMT";
		token.token_type = "bearer";
		token.userName = "admin@admin.com";
		cookieStorage.setUser(token);
	};

	handleErase = () => {
		cookieStorage.removeUser();
		Api.setToken(undefined);
		window.alert("Done!")
	};

	handleLoad = () => {
		var token = cookieStorage.getUser() as TokenResult;
		if (token !== undefined) {
			window.alert(token.userName);
			Api.setToken(token.access_token);
		} else {
			window.alert('save first!');
		}
	}

	toastTest = () => {
		toast.success("Success Notification !");
	}

	protected getPageTitle(): string {
		return 'Home Page';
	}

	protected renderLeft() : any {
		return (
			<div>
				Test of Left Part of Screen
			</div>
		);
	}

	protected renderRight() : any {
		return (
			<div>
				Test of Right Part of Screen
			</div>
		);
	}

	protected doRender() : any {
		return (
			<div>
				<p>
					This is the default page! <br />
					We use Boostrap. <br />
					<Button variant="outline-primary" onClick={this.handleSave}>Save Cookie</Button>&nbsp;
					<Button variant="outline-success" onClick={this.handleLoad}>Load Cookie</Button>&nbsp;
					<Button variant="outline-danger" onClick={this.handleErase}>Remove Cookie</Button>
					<br /><br />
					<Button onClick={this.toastTest}>Toast Test</Button>
				</p>
				To <Link to="/about">About</Link> Page. <br />
				To <Link to="/PageNotFound">An Error (404)</Link> Page.<br />
				To <Link to="/values/4">Values ID = 4</Link> Page.<br />
				To <Link to="/values/7">Values ID = 7</Link> Page.<br />
				<hr/>
				Glyphicons Test: <br />
				faPlus: <Glyphicon glyph="plus" /> <br />
				faEdit: <Glyphicon glyph="edit" /> <br />
				faTrashAlt: <Glyphicon glyph="trash-alt" /> <br />
				faExclamationCircle: <Glyphicon glyph="exclamation-circle" /> <br />
			</div>
		);
	}
}

export default HomePage;