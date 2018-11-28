import * as React from 'react';
import { Panel } from 'react-bootstrap';
import '../inc/App.css';

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
			<div className="Footer">
<Panel className="footer hidden-print">

</Panel>


				Page Footer <small>Date/Time = <b>{this.state.creationTime}</b></small>
			</div>
		);
	}

}

export default FooterComponent;