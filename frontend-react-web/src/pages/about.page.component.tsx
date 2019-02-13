import * as React from 'react';
import BaseViewComponent from '../components/base.view.component';
import PageFrame from '../components/pageframe.component';
import ModalWindow from '../components/modalwindow.component';
import { ButtonType } from '../configurations/button.config';

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
		return (
			<div>
				Name: <input />
			</div>
		);
	}

	onClick = () => {
		this.setState({
			show: !this.state.show
		});
	}

	handleClose = () => {
		this.setState({
			show: false
		});
	}

	handleBtnClick = (btnType: ButtonType) => {
		alert('Type = ' + btnType);
		this.handleClose();
	}

	render() {
		return (
			<PageFrame center={true}>
				It's me, React!
				<br />
				<button onClick={this.onClick}>Show Modal</button>
				<ModalWindow
					show={this.state.show}
					onHandleClose={this.handleClose}
					onHandleBtnClick={this.handleBtnClick}
					caption='Simple Windows Message'
					text='Here we can write about everything and create other controls...'
					element={this.getForm()} />
			</PageFrame>
		);
	}

}

export default AboutPage;