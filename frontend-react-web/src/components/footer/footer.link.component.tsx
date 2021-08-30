import * as React from 'react';
import '../../inc/App.css';

type FooterLinkProps = {
	href: string;
	img: string;
	title: string;
};
type FooterLinkStates = {};

class FooterLinkComponent extends React.Component<FooterLinkProps, FooterLinkStates>{

	constructor(props:any) {
		super(props);

		this.getImagePath = this.getImagePath.bind(this);
	}

	getImagePath() {
		return require('../../img/footer/' + this.props.img + '.png').default; //"/./img/" + this.props.img + ".png";
	}

	render() {
		return (
			<a href={this.props.href} target="_blank" rel="noreferrer">
				<img src={this.getImagePath()} className="size-24 link-img" title={this.props.title} alt={this.props.title} />
			</a>
		);
	}

}

export default FooterLinkComponent;
