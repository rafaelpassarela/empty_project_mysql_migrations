import * as React from 'react';

type FooterProps = {};
type FooterStates = {
	creationTime: string
};

class FooterComponent extends React.Component<FooterProps, FooterStates> {

	constructor(props: any) {
		super(props);

		let datetime = new Date().toLocaleString();
		this.state = {
			creationTime: datetime
		};
	}

	render() {

		return (
			<div>
				<hr />
				Page Footer <small>Date/Time = <b>{this.state.creationTime}</b></small>
			</div>
		);
	}

}

export default FooterComponent;