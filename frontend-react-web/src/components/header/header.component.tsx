import * as React from 'react';
import { Link } from 'react-router-dom';
import { HeaderLinksConfig, MenuItem } from '../../configurations/links.config';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavBarItemLink from './navbaritem.link.component';

import LoadingSmall from '../loading.small.component';
import LoginControl from '../login.control.component';
// custom logo
import logo from '../../img/logo_small.png';
import '../../inc/App.css';

interface IHeaderComponentState extends React.Props<IHeaderComponentState> {
	items: Array<MenuItem>,
	expanded: boolean,
	loading: boolean
}

class HeaderComponent extends React.Component<{}, IHeaderComponentState> {

	constructor(props: any) {
		super(props);

		this.navbarToggle = this.navbarToggle.bind(this);
		this.navbarItemSelect = this.navbarItemSelect.bind(this);
		this.onAfterLogIn = this.onAfterLogIn.bind(this);
		this.onAfterLogOut = this.onAfterLogOut.bind(this);

		this.state = { 
			items: HeaderLinksConfig.getFixedItems(),
			expanded: false, 
			loading: false};
	}

	private navbarToggle() {
		this.setState({
			expanded: !this.state.expanded
		});
	}

	private navbarItemSelect() {
		this.setState({
			expanded: false
		});
	}

	private getRegularItem(item: MenuItem, idx: number, isDropDown?: boolean) : any {
		return (
			<NavBarItemLink
				key={idx}
				eventKey={item.route}
				to={item.route}
				caption={item.caption}
				navbarControll={this.navbarItemSelect}
				isDropDownItem={isDropDown}
			/>
		);
	}

	private getDropDownItem(item: MenuItem, idx: number) : any {
		let subItems = (item.dropDown == null) ? null : item.dropDown.map( (sub: MenuItem, subIdx: number) => {
			return this.getRegularItem(sub, subIdx, true);
		});

		return (
			<NavDropdown key={idx} title={item.caption} id="basic-nav-dropdown-options">
				{subItems}
			</NavDropdown>
		);
	}

	private onAfterLogOut() {
		this.setState({
			items: HeaderLinksConfig.getFixedItems(),
			loading: false
		});
	}

	private onAfterLogIn() {		
		this.setState({loading: true}, () => {
			alert ('Call the API to Load MenuItens for the Loggedin User');
		});
	}

	render() {

		return (
			<div>
				<Navbar className="app-shadow navbar-fix" fixed="top" bg="light" expand="md" expanded={this.state.expanded} onToggle={this.navbarToggle}>
					<Navbar.Brand className="navbar-img">
						<Link to="/">
							<img src={logo} alt="Company Name" />
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />

					<Navbar.Collapse>
						<Nav className="mr-auto">
							{
								this.state.items.map((item: MenuItem, idx: number) => {
									if (item.dropDown == null)
										return this.getRegularItem(item, idx, false);

									return this.getDropDownItem(item, idx);
								})
							}
							<LoadingSmall marginTop={17} key="999" active={this.state.loading} />
						</Nav>
						<LoginControl 
							onBeforeShowLoginForm={this.navbarItemSelect}
							onAfterLogout={this.onAfterLogOut}
							onAfterSuccessLogin={this.onAfterLogIn}
						/>
					</Navbar.Collapse>
				</Navbar >
			</div>
		);
	}

}

export default HeaderComponent;