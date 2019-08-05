import * as React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FooterLinksConfig } from '../../configurations/links.config';

import '../../inc/App.css';

class FooterComponent extends React.Component {

	render() {

		return (
			<div className="footer app-shadow hidden-print">
				<Container className="footerLinks">
					<Row>
						<Col className="footerLinksRight" xs={6} sm={6} md={6} lg={6}>
							{FooterLinksConfig.getItemsLeft()}
						</Col>
						{
							// vertline
						}
						<Col className="footerLinksLeft" xs={6} sm={6} md={6} lg={6}>
							{FooterLinksConfig.getItemsRight()}
						</Col>
					</Row>
				</Container>
			</div>
		);
	}

}

export default FooterComponent;