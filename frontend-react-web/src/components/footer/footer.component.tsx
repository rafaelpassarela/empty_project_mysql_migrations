import * as React from 'react';
import FooterLinkComponent from './footer.link.component';

import '../../inc/App.css';

class FooterComponent extends React.Component {

	render() {

		return (
			<div className="footer shadow hidden-print">
				<div className="container footerLinks">
					<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 footerLinksRight">
						<small className="sixFive">&copy; 2017 <strong>Rafael Passarela </strong></small><br />
						<FooterLinkComponent href="https://ca.linkedin.com/in/rafaelpassarela" img="ext_linked" title="LinkedIn" />
						<FooterLinkComponent href="https://www.twitter.com/rafaelpassarela" img="ext_twitter" title="Twitter" />
						<FooterLinkComponent href="https://github.com/rafaelpassarela" img="ext_git2" title="GitHub" />
						<FooterLinkComponent href="http://stackoverflow.com/story/mrrafael" img="ext_stack" title="Stack Overflow" />
						<FooterLinkComponent href="https://angel.co/rafaelpassarela" img="ext_angellist" title="AngelList" />
					</div>
					<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 vertline footerLinksLeft">
						<small className="sixFive"><strong>Made With</strong></small><br />
						<FooterLinkComponent href="https://goo.gl/UtlTpB" img="madelove" title="Made With Love" />
						<FooterLinkComponent href="https://reactjs.org/" img="madereact" title="React" />
						<FooterLinkComponent href="https://www.typescriptlang.org/" img="madets" title="TypeScript" />
						<FooterLinkComponent href="https://react-bootstrap.github.io/" img="madebs" title="React-Bootstrap" />
						<FooterLinkComponent href="https://nodejs.org/en/" img="madenode" title="Node.js" />
					</div>
				</div>
			</div>
		);
	}

}

export default FooterComponent;