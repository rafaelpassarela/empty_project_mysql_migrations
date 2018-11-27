import * as React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap/';
import { Nav } from 'react-bootstrap';
import '../../inc/App.css';

import NavBarItemLink  from './navbaritem.link.component';
// custom logo
import logo from '../../img/logo_small.png';

class HeaderComponent extends React.Component {

	render() {

		return (
			<div>
				<Navbar fixedTop>
					<Navbar.Header>
						<Navbar.Brand className="NavbarImg">
							<Link to="/">
								<img src={logo} alt="Company Name" />
							</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<NavBarItemLink eventKey={1} to="/" caption="Home" />
							<NavBarItemLink eventKey={1} to="/about" caption="About" />
						</Nav>

					</Navbar.Collapse>
				</Navbar >
			</div>
		);
	}

}

export default HeaderComponent;