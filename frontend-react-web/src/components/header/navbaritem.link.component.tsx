import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { NavItem } from 'react-bootstrap';

// With the use of React with Typescript and React-Router, it is not possible to insert a "Link"
// within the "NavItem" component, so that this class treats this case

type NavBarItemProps = {
	caption: string,
	to: string,
	eventKey: number,
	navbarControll: Function
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

		return (
			<NavItem eventKey={key} href='#' onClick={this.handleClick}>{caption}{redirect}</NavItem>
		);

	}

}

export default NavBarItemLink;