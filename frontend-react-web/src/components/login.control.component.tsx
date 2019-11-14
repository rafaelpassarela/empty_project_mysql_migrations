import * as React from 'react';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';

import { cookieStorage } from '../helpers/cookie.helper';
import LocalizationConfig from '../configurations/localization.config';
import ModalWindow from './modalwindow.component';
import LoginForm from './login.form.component';
import Api, { ErrorData } from '../client-api/api';

import '../inc/login.control.css';

interface ILoginControlProps extends React.Props<ILoginControlProps> {
	onBeforeShowLoginForm?: () => any,
	onAfterSuccessLogin?: () => any,
	onAfterLogout?: () => any
}

interface ILoginControlState extends React.Props<ILoginControlState> {
	loggedIn: boolean,
	loginHover: boolean,
	showLoginForm: boolean,
	loginMessage: string,
	userName: string,
	formLoading: boolean
}

class LoginControl extends React.Component<ILoginControlProps, ILoginControlState> {

	constructor(props: any) {
		super(props);

		this.state = {
			loggedIn: this.isLoggedIn(),
			loginHover: false,
			showLoginForm: false,
			formLoading: false,
			loginMessage: '',
			userName: ''
		};

		this.isLoggedIn = this.isLoggedIn.bind(this);
		this.getUserMenu = this.getUserMenu.bind(this);
		this.getLoginMenu = this.getLoginMenu.bind(this);
		this.getLoginForm = this.getLoginForm.bind(this);
		this.createTimer = this.createTimer.bind(this);
		this.removeTimer = this.removeTimer.bind(this);
		this.onCloseLoginForm = this.onCloseLoginForm.bind(this);
		this.onMouseHoverLogin = this.onMouseHoverLogin.bind(this);
		this.onLogOutMenuClick = this.onLogOutMenuClick.bind(this);
		this.doShowLogin = this.doShowLogin.bind(this);
		this.loginBtnClick = this.loginBtnClick.bind(this);
		this.performLogin = this.performLogin.bind(this);
	}

	private checkLoginIntervalID: number = -1;
	private inRender: boolean = false;

	componentDidMount() {
		this.createTimer();
		if (this.state.loggedIn === true) {
			let user = cookieStorage.getUser();
			Api.setToken(user.access_token);
			this.setState({
				userName: user.userName
			});
		}
	}

	componentWillUnmount() {
		this.removeTimer();
	}

	private createTimer() {
		if (this.checkLoginIntervalID === -1) {
			this.checkLoginIntervalID = window.setInterval(() => {
				console.log(new Date().toString())
			}, 60000); // every minute
		}
	}

	private removeTimer() {
		if (this.checkLoginIntervalID !== -1) {
			window.clearInterval(this.checkLoginIntervalID);
			this.checkLoginIntervalID = -1;
		}
	}

	private onCloseLoginForm() {
		this.setState({
			showLoginForm: false,
			loggedIn: this.isLoggedIn(),
			formLoading: false,
			loginMessage: ''
		});
		this.createTimer();
	}

	private isLoggedIn(): boolean {
		return cookieStorage.getUser() != null;
	}

	private onMouseHoverLogin(isHover : boolean) {
		if (!this.inRender) {
			this.setState({
				loginHover: isHover
			});
		}
	}

	private doShowLogin() {
		if (this.props.onBeforeShowLoginForm !== undefined) {
			this.props.onBeforeShowLoginForm();
		}
		this.setState({showLoginForm: true})
	}

	private performLogin(userName: string, password: string) {
		Api.token().Token_Post(
			(data:any) => {
				this.setState({
					formLoading: false,
					showLoginForm: false,
					loginMessage: '',
					userName: data.userName,
					loggedIn: data.userName !== undefined && data.userName !== ""
				});				
				cookieStorage.setUser(data);
				Api.setToken(data.access_token);
				if (this.props.onAfterSuccessLogin !== undefined) {
					this.props.onAfterSuccessLogin();
				}
			},
			(error:ErrorData) => {
				let msg: string = (error.data !== null) ? error.data.error_description : error.message;
				this.setState({
					formLoading: false,
					userName: '',
					loggedIn: false,
					loginMessage: msg
				});
				cookieStorage.removeUser();
				Api.setToken(undefined);
			},
			"password", userName, password);
	}

	private loginBtnClick(userName: string, password: string) {
		cookieStorage.setStorage('user-email', userName, false);
		this.setState({
			loginMessage: '',
			formLoading: true
		}, () => {
			this.performLogin(userName, password);
		});
	}

	private onLogOutMenuClick() {
		this.setState({
			userName: '',
			loggedIn: false,
		}, () => {
			cookieStorage.removeUser();
			Api.setToken(undefined);
			if (this.props.onAfterLogout !== undefined) {
				this.props.onAfterLogout();
			}
		})
	}

	getLoginForm = () => {
		this.removeTimer();

		let form = (<LoginForm loading={this.state.formLoading} onLoginBtnClick={this.loginBtnClick} />);
		let footer = (this.state.loginMessage !== '') ? (
			<div className="footer-message">
				{this.state.loginMessage}
			</div>
		) : null;

		return (
			<ModalWindow
				show={true}
				size="lg"
				customClassName="login-form"
				caption={LocalizationConfig.logIn}
				centered={false}
				closeButton={!this.state.formLoading}
				element={form}
				footerElement={footer}
				buttonList={[]}
				onHandleClose={this.onCloseLoginForm}
				onHandleBtnClick={undefined}
			/>
		);
	}

	getUserMenu = () : any => {
		return (
			<NavDropdown key={123} title={this.state.userName} id="basic-nav-dropdown-user-login">
				<NavDropdown.Divider />
        		<NavDropdown.Item eventKey="9.99" onSelect={this.onLogOutMenuClick}>{LocalizationConfig.logOut}</NavDropdown.Item>
			</NavDropdown>
		);
	}

	getLoginMenu = () : any => {
		const linkColor = "rgba(0,0,0," + ((this.state.loginHover === true) ? ".9" : ".5") + ")";

		return (
			<Navbar.Text>
				<a
					style={{color: linkColor}} 
					onMouseLeave={() => this.onMouseHoverLogin(false)}
					onMouseEnter={() => this.onMouseHoverLogin(true)}
					onClick={() => this.doShowLogin()}
					href="#">
						{LocalizationConfig.logIn}
				</a>
			</Navbar.Text>
		);
	}

	render() {
		this.inRender = true;

		let login: any;
		let form: any = null;

		if (this.state.loggedIn === true) {
			login = this.getUserMenu();
		} else {
			login = this.getLoginMenu();
		}

		// rules for the login form:
		// - user clicked directly on "LogIn" label
		if (this.state.showLoginForm) {
			form = this.getLoginForm();
		}

		this.inRender = false;
		return (
			<span>
				<Form inline style={{marginRight: 10}}>
					{login}
				</Form>
				{form}
			</span>
		);
	}

}

export default LoginControl;