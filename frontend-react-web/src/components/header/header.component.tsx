import * as React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../../inc/App.css';

import NavBarItemLink from './navbaritem.link.component';
// custom logo
import logo from '../../img/logo_small.png';

type MenuIten = {
	route: string;
	caption: string
}

class HeaderComponent extends React.Component<{}, { expanded: boolean }> {

	constructor(props: any) {
		super(props);

		this.navbarToggle = this.navbarToggle.bind(this);
		this.navbarItemSelect = this.navbarItemSelect.bind(this);

		this.state = { expanded: false };
	}

	navbarToggle() {
		this.setState({
			expanded: !this.state.expanded
		});
	}

	navbarItemSelect() {
		this.setState({
			expanded: false
		});
	}

	getMenuList = (): Array<MenuIten> => {
		let itens = Array<MenuIten>(
			{ route: '/', caption: 'Home' },
			{ route: 'values', caption: 'Values' },
			{ route: 'about', caption: 'About' }
		);

		return itens;
	}

	render() {
		let itens = this.getMenuList();

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
								itens.map((item: MenuIten, idx: number) => {
									return (
										<NavBarItemLink
											key={idx}
											eventKey={1}
											to={item.route}
											caption={item.caption}
											navbarControll={this.navbarItemSelect}
										/>)
								})
							}
						</Nav>
					</Navbar.Collapse>
				</Navbar >
			</div>
		);
	}

}

export default HeaderComponent;