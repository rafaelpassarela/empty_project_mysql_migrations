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
	redir: any,
	needRender: boolean
};

class NavBarItemLink extends React.Component<NavBarItemProps, NavBarItemStates> {

	constructor(props: any) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			to: this.props.to,
			redir: undefined,
			needRender: false
		}
	}

	handleClick() {
		let destination = <Redirect to={this.state.to} />;
		this.setState({
			redir: destination,
			needRender: true
		});
	}

	componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
		if (this.state.redir != undefined || this.state.needRender === true) {
			this.setState({
				redir: undefined,
				needRender: false
			});
		}
	}

	// shouldComponentUpdate(nextProps:any, nextState:any) {
	// 	return (nextState.redir == undefined)
	// 	    || (nextState.to != window.location.pathname);
	// }

	render() {

		const caption = this.props.caption;
		const key = this.props.eventKey;

		const validURL = (this.state.redir != undefined)
			&& (this.state.needRender)
			&& (this.state.to != window.location.pathname);
		const redirect = (validURL) ? this.state.redir : null;

		return (
			<NavItem eventKey={key} href='#' onClick={this.handleClick}>{caption}{redirect}</NavItem>
		);

	}

}

export default NavBarItemLink;