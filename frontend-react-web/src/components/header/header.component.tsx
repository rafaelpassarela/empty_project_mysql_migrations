import * as React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap/';
import { Nav } from 'react-bootstrap';
import '../../inc/App.css';

import NavBarItemLink from './navbaritem.link.component';
// custom logo
import logo from '../../img/logo_small.png';

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

	render() {
		return (
			<div>
				<Navbar className="shadow" fixedTop fluid expanded={this.state.expanded} onToggle={this.navbarToggle}>
					<Navbar.Header>
						<Navbar.Brand className="navbarImg">
							<Link to="/">
								<img src={logo} alt="Company Name" />
							</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<NavBarItemLink eventKey={1} to="/" caption="Home" navbarControll={this.navbarItemSelect}/>
							<NavBarItemLink eventKey={1} to="/values" caption="Some Values" navbarControll={this.navbarItemSelect} />
							<NavBarItemLink eventKey={1} to="/about" caption="About" navbarControll={this.navbarItemSelect} />
						</Nav>

					</Navbar.Collapse>
				</Navbar >
			</div>
		);
	}

}

export default HeaderComponent;