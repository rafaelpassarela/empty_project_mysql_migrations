import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

// With the use of React with Typescript and React-Router, it is not possible to insert a "Link"
// within the "NavItem" component, so that this class treats this case

type NavBarItemProps = {
	caption: string,
	to: string,
	eventKey: string | number,
	navbarControll: Function,
	isDropDownItem?: boolean
};
type NavBarItemStates = {
	to: string,
	redirectTo: any
};

class NavBarItemLink extends React.Component<NavBarItemProps, NavBarItemStates> {

	constructor(props: any) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			to: this.props.to,
			redirectTo: undefined
		}
	}

	handleClick() {
		let destination = <Redirect to={this.state.to} />;
		this.setState({
			redirectTo: destination
		});
		if (this.props.navbarControll != undefined) {
			this.props.navbarControll();
		}
	}

	componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
		if (this.state.redirectTo != undefined) {
			this.setState({
				redirectTo: undefined
			});
		}
	}

	render() {

		const caption = this.props.caption;
		const key = this.props.eventKey;

		const validURL =
			(this.state.redirectTo != undefined) &&
			(this.state.to != window.location.pathname);

		const redirect = (validURL) ? this.state.redirectTo : null;

		let item = null;
		if (this.props.isDropDownItem === true) {
			item = (caption === '-') 
				? <NavDropdown.Divider /> 
				: <NavDropdown.Item eventKey={key} href="#" active={false} onClick={this.handleClick}>{caption}{redirect}</NavDropdown.Item>;
		} else {
			item = (<Nav.Link eventKey={key} href='#' onClick={this.handleClick}>{caption}{redirect}</Nav.Link>);
		}

		return item;

	}

}

export default NavBarItemLink;