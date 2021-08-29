import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import LoadingSmall from './loading.small.component';
import LocalizationConfig from '../configurations/localization.config';
import { cookieStorage } from '../helpers/cookie.helper';
import { formHelper } from '../helpers/form.helper';


import '../inc/login.control.css';

interface ILoginFormProps extends React.Props<ILoginFormProps> {
	loading: boolean,
	onLoginBtnClick: (userName: string, password: string) => any,
}

interface ILoginFormState extends React.Props<ILoginFormState> {
	user: string,
	password: string,
}

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {

	constructor(props: any) {
		super(props);

		this.state = {
			password: '',
			user: cookieStorage.getStorage('user-email', '', false),
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.doLoginButtonClick = this.doLoginButtonClick.bind(this);
	}

	componentDidMount() {
		formHelper.focusElementByIdDelayed("formLogin_user");
	}

	private handleSubmit(event: any) {
		const canSubmit = false;

		if (!canSubmit || event.currentTarget.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	private handleKeyUp(event: any) {
		if (event.keyCode == 13) {
			if (event.target.name === "loginUser") {
				formHelper.focusElementById("formLogin_pwd");
				return;
			}

			if (event.target.name === "loginPwd") {
				this.doLoginButtonClick();
				return;
			}
		}
	}

	private handleChange(event: any) {
		const prop = event.target.name;
		const value = event.target.value;

		if (prop === "loginUser") {
			this.setState({
				user: value
			})
		} else {
			this.setState({
				password: value
			});
		}
	}

	private doLoginButtonClick() {
		this.props.onLoginBtnClick(this.state.user, this.state.password);
	}

	render() {
		let imgLogin = require('../img/login.png');

		return (
			<Form id="login_form" noValidate validated={true} onSubmit={this.handleSubmit}>
				<Container><Row className="login-row">
					<Col sm={4} className="login-img-col">
						<img src={imgLogin}/>
					</Col>
					<Col sm={8} className="login-controls-row">
						<Form.Group as={Row} className="login-form-group" controlId="formLogin_user">
							<Col sm={12}>
								<Form.Control 
									className="login-controls"
									name="loginUser"
									type="email"
									disabled={this.props.loading}
									readOnly={false}
									required={true}
									placeholder="E-Mail"
									maxLength={256}
									value={this.state.user}
									onChange={this.handleChange}
									onKeyUp={this.handleKeyUp}
								/>
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="login-form-group" controlId="formLogin_pwd">
							<Col sm={12}>
								<Form.Control 
									className="login-controls"
									name="loginPwd"
									type="password"
									disabled={this.props.loading}
									readOnly={false}
									required={true}
									placeholder="Password"
									maxLength={20}
									value={this.state.password}
									onChange={this.handleChange}
									onKeyUp={this.handleKeyUp}
								/>
							</Col>
						</Form.Group>
						<Row className="login-btn-row">
							<Button variant="info" onClick={this.doLoginButtonClick} disabled={this.props.loading}>
								<LoadingSmall key="999" active={this.props.loading} />
								{LocalizationConfig.logIn}
							</Button>
						</Row>
					</Col>
				</Row></Container>
			</Form>
		);
	}

}

export default LoginForm;