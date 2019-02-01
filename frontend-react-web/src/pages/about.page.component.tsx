import * as React from 'react';
import BaseViewComponent from '../components/base.view.component';
import PageFrame from '../components/pageframe.component';
import Modal from '../components/modal.component';

class AboutPage extends BaseViewComponent<{}, { show: boolean }> {

	protected getTitle(): string {
		return 'About';
	}

	constructor(props: any) {
		super(props);

		this.state = {
			show: false
		};
	}

	getForm = (): any => {
		return (<div>Name: <input /> </div>);
	}

	onClick = () => {
		this.setState({
			show: true
		});
	}

	render() {
		return (
			<PageFrame center={true}>
				It's me, React!
				<br/>
				<button onClick={this.onClick}>Show Modal</button>
				<Modal show={this.state.show} element={this.getForm()} />
			</PageFrame>
		);
	}

}

export default AboutPage;