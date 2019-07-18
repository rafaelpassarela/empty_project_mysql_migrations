import * as React from 'react';
import { Link } from 'react-router-dom';
import { HeaderLinksConfig, MenuItem } from '../../configurations/links.config';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LoadingSmall from '../loading.small.component';
import NavBarItemLink from './navbaritem.link.component';
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

		this.state = { 
			items: HeaderLinksConfig.getFixedItems(),
			expanded: false, 
			loading: false};
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
									return (
										<NavBarItemLink
											key={idx}
											eventKey={item.route}
											to={item.route}
											caption={item.caption}
											navbarControll={this.navbarItemSelect}
										/>)
								})
							}
							<LoadingSmall key="999" active={this.state.loading} />
						</Nav>
					</Navbar.Collapse>
				</Navbar >
			</div>
		);
	}

}

export default HeaderComponent;