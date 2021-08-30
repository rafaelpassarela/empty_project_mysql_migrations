import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BaseViewComponent, { IBaseViewProps } from '../components/base.view.component';
import ModalWindow from '../components/modalwindow.component';
import { ButtonType } from '../configurations/button.config';

interface IAboutPageState extends React.Props<IAboutPageState> {
	show: boolean,
	modalResult?: number,
	modalCaption?: string,
	modalText?: string,
	modalEasyMode?: boolean,
	modalCentered?: boolean,
	modalCloseButton?: boolean
	modalSize?: 'sm' | 'lg'
}

class AboutPage<P extends IBaseViewProps, S extends IAboutPageState> extends BaseViewComponent<P, S> {

	protected getPageTitle(): string {
		return 'About';
	}

	constructor(props: any) {
		super(props);

		this.state = {
			...props,
			show: false,
			modalResult: undefined,
			modalCaption: 'Modal Window Test',
			modalText: 'Here we can write about everything and create other controls...',
			modalEasyMode: false,
			modalCentered: true,
			modalCloseButton: true
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
		this.setState({
			modalResult: btnType
		});
		this.handleClose();
	}

	handleChange = (event: any) => {
		let prop = event.target.name;
		let value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;

		let localState: {[index : string] : any} = this.state;
		localState[prop] = value;

		this.setState(localState as IAboutPageState);
	}

	protected doRender() : any {
		let modalResult = (this.state.modalResult !== undefined) ? <div>Modal Result: {this.state.modalResult}</div> : null;
		// {(event: any) => this.setState({ modalCaption: event.target.value })}
		return (
			<div>
				<h1>It's me, React!</h1>
				<hr />
				Modal Window Params:<br />
				<Form>
					<Form.Group controlId="formModalCaption">
						<Form.Label>Caption</Form.Label>
						<Form.Control
							name="modalCaption"
							type="text"
							placeholder="Enter Modal Caption"
							value={this.state.modalCaption}
							onChange={this.handleChange} />
						<Form.Text className="text-muted">
							A header message for the Modal Window
    					</Form.Text>
					</Form.Group>

					<Form.Group controlId="formModalMessage">
						<Form.Label>Message</Form.Label>
						<Form.Control
							name="modalText"
							as="textarea"
							placeholder="Text Message"
							rows={3}
							value={this.state.modalText}
							onChange={this.handleChange} />
					</Form.Group>

					<Form.Group controlId="formModalSize">
						<Form.Label>Size</Form.Label>
						<Form.Control as="select" name="modalSize" onChange={this.handleChange}>
							<option>Default</option>
							<option>sm</option>
							<option>lg</option>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="formModalEasy">
						<Form.Check
							name="modalEasyMode"
							type="checkbox"
							label="Easy Mode"
							checked={this.state.modalEasyMode}
							onChange={this.handleChange} />
						<Form.Text className="text-muted">Enable Modal Close by pressing ESC or Click outside the modal</Form.Text>
					</Form.Group>

					<Form.Group controlId="formModalCenter">
						<Form.Check
							name="modalCentered"
							type="checkbox"
							label="Centered"
							checked={this.state.modalCentered}
							onChange={this.handleChange} />
					</Form.Group>

					<Form.Group controlId="formModalClose">
						<Form.Check
							name="modalCloseButton"
							type="checkbox"
							label="Close Button"
							checked={this.state.modalCloseButton}
							onChange={this.handleChange} />
					</Form.Group>

					<Button onClick={this.onClick}>
						Show Modal
					</Button>
				</Form>

				<ModalWindow
					show={this.state.show}
					easyClose={this.state.modalEasyMode}
					caption={this.state.modalCaption}
					text={this.state.modalText}
					buttonList={[ButtonType.BTN_YES, ButtonType.BTN_NO]}
					centered={this.state.modalCentered}
					closeButton={this.state.modalCloseButton}
					size={this.state.modalSize}
					element={this.getForm()}
					onHandleClose={this.handleClose}
					onHandleBtnClick={this.handleBtnClick} />
				{modalResult}
				{"\u2764"}
			</div>
		);
	}

}

export default AboutPage;