import * as React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FooterLinkComponent from './footer.link.component';

import '../../inc/App.css';

class FooterComponent extends React.Component {

	render() {

		return (
			<div className="footer app-shadow hidden-print">
				<Container className="footerLinks">
					<Row>
						<Col className="footerLinksRight" xs={6} sm={6} md={6} lg={6}>
							<small className="sixFive">&copy; 2017 <strong>Rafael Passarela </strong></small><br />
							<FooterLinkComponent href="https://ca.linkedin.com/in/rafaelpassarela" img="ext_linked" title="LinkedIn" />
							<FooterLinkComponent href="https://www.twitter.com/rafaelpassarela" img="ext_twitter" title="Twitter" />
							<FooterLinkComponent href="https://github.com/rafaelpassarela" img="ext_git2" title="GitHub" />
							<FooterLinkComponent href="http://stackoverflow.com/story/mrrafael" img="ext_stack" title="Stack Overflow" />
							<FooterLinkComponent href="https://angel.co/rafaelpassarela" img="ext_angellist" title="AngelList" />
						</Col>
						{
							// vertline
						}
						<Col className="footerLinksLeft" xs={6} sm={6} md={6} lg={6}>
							<small className="sixFive"><strong>Made With</strong></small><br />
							<FooterLinkComponent href="https://goo.gl/UtlTpB" img="madelove" title="Made With Love" />
							<FooterLinkComponent href="https://reactjs.org/" img="madereact" title="React" />
							<FooterLinkComponent href="https://www.typescriptlang.org/" img="madets" title="TypeScript" />
							<FooterLinkComponent href="https://react-bootstrap.github.io/" img="madebs" title="React-Bootstrap" />
							<FooterLinkComponent href="https://nodejs.org/en/" img="madenode" title="Node.js" />
						</Col>
					</Row>
				</Container>
			</div>
		);
	}

}

export default FooterComponent;