import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { NavItem } from 'react-bootstrap';

// With the use of React with Typescript and React-Router, it is not possible to insert a "Link"
// within the "NavItem" component, so that this class treats this case

type NavBarItemProps = {
	caption: string,
	to: string,
	eventKey: number
};
type NavBarItemStates = {
	to: string,
	redir: any
};

class NavBarItemLink extends React.Component<NavBarItemProps, NavBarItemStates> {

	constructor(props: any) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			to: this.props.to,
			redir: undefined
		}
	}

	handleClick() {
		let destination = <Redirect to={this.state.to} />;
		this.setState({
			redir: destination
		});
	}

	componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
		if (prevState.redir != undefined) {
			this.setState({ redir: undefined });
		}
	}

	// shouldComponentUpdate(nextProps:any, nextState:any) {
	// 	return (nextState.redir == undefined)
	// 	    || (nextState.to != window.location.pathname);
	// }

	render() {

		const caption = this.props.caption;
		const key = this.props.eventKey;

		const redirect = (this.state.redir != undefined && this.state.to != window.location.pathname) ? this.state.redir : null;

		return (
			<NavItem eventKey={key} href='#' onClick={this.handleClick}>{caption}{redirect}</NavItem>
		);

	}

}

export default NavBarItemLink;