import * as React from 'react';
import FooterLinkComponent from '../components/footer/footer.link.component';

export type MenuItem = {
	route: string;
	caption: string
}

// ********* Header Items
export class HeaderLinksConfig {

	public static getFixedItems(): Array<MenuItem> {

		let items = Array<MenuItem>(
			{ route: '/', caption: 'Home' },
			{ route: 'values', caption: 'Values' },
			{ route: 'about', caption: 'About' }
		);

		return items;
	}
}

// ********* Footer Items
export class FooterLinksConfig {

	public static getItemsLeft() {

		let items = [];
		items.push(<div key="0"><small className="sixFive">&copy; 2019 <strong>Rafael Passarela </strong></small><br /></div>);
		items.push(<FooterLinkComponent key="1" href="https://ca.linkedin.com/in/rafaelpassarela" img="ext_linked" title="LinkedIn" />);
		items.push(<FooterLinkComponent key="2" href="https://www.twitter.com/rafaelpassarela" img="ext_twitter" title="Twitter" />);
		items.push(<FooterLinkComponent key="3" href="https://github.com/rafaelpassarela" img="ext_git2" title="GitHub" />);
		items.push(<FooterLinkComponent key="4" href="http://stackoverflow.com/story/mrrafael" img="ext_stack" title="Stack Overflow" />);
		items.push(<FooterLinkComponent key="5" href="https://angel.co/rafaelpassarela" img="ext_angellist" title="AngelList" />);

		return items;
	}

	public static getItemsRight() {

		let items = [];
		items.push(<div key="0"><small className="sixFive"><strong>Made With</strong></small><br /></div>);
		items.push(<FooterLinkComponent key="1" href="https://goo.gl/UtlTpB" img="madelove" title="Made With Love" />);
		items.push(<FooterLinkComponent key="2" href="https://reactjs.org/" img="madereact" title="React" />);
		items.push(<FooterLinkComponent key="3" href="https://www.typescriptlang.org/" img="madets" title="TypeScript" />);
		items.push(<FooterLinkComponent key="4" href="https://react-bootstrap.github.io/" img="madebs" title="React-Bootstrap" />);
		items.push(<FooterLinkComponent key="5" href="https://nodejs.org/en/" img="madenode" title="Node.js" />);

		return items;
	}	
}
