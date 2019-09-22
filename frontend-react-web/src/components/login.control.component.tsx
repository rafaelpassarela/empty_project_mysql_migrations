import * as React from 'react';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
//import 'node';
//import 'NodeJS';

import { cookieStorage } from '../helpers/cookie.helper';
import LocalizationConfig from '../configurations/localization.config';

import '../inc/login.control.css';

interface ILoginControlState extends React.Props<ILoginControlState> {
	loggedIn: boolean,
	loginHover: boolean
}

class LoginControl extends React.Component<{}, ILoginControlState> {

	constructor(props: any) {
		super(props);

		this.state = {
			loginHover: false,
			loggedIn: cookieStorage.getUser() != null
		};

		this.isLoggedIn = this.isLoggedIn.bind(this);
		this.getUserMenu = this.getUserMenu.bind(this);
		this.getLoginMenu = this.getLoginMenu.bind(this);
	}

	private checkLoginIntervalID: number;

	componentDidMount() {
		this.checkLoginIntervalID = window.setInterval(() => {
			console.log(new Date().toString())
		}, 60000); // every minute
	}

	componentWillUnmount() {
		window.clearInterval(this.checkLoginIntervalID);
	}

	isLoggedIn = (): boolean => {
		return false;
	}

	getUserMenu = () : any => {
		return (
			<NavDropdown key={123} title="User Login" id="basic-nav-dropdown-user-login">
			</NavDropdown>
		);
	}

	getLoginMenu = () : any => {
		const linkColor = "rgba(0,0,0," + ((this.state.loginHover === true) ? ".9" : ".5") + ")";

		return (
			<Navbar.Text>
				<a
					style={{color: linkColor}} 
					onMouseLeave={() => this.setState({loginHover: false})}
					onMouseEnter={() => this.setState({loginHover: true})}
					href="#">
						{LocalizationConfig.logIn}
				</a>
			</Navbar.Text>
		);
	}

	render() {

		const info = (this.state.loggedIn === true) ? this.getUserMenu() : this.getLoginMenu();

		return (
			<Form inline style={{marginRight: 10}}>
				{info}
			</Form>
		);
	}

}

export default LoginControl;