import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonList, { ButtonConfig, ButtonType } from '../configurations/button.config';

interface IModalWindowProps extends React.Props<IModalWindowProps> {
	show: boolean,
	onHandleClose: () => void,
	onHandleBtnClick: (btnType: ButtonType) => void,
	buttonList: Array<ButtonType>,
	caption?: string,
	text?: string,
	element?: any,

	closeButton?: boolean,
	size?: 'sm' | 'lg',
	centered?: boolean
}

class ModalWindow extends React.Component<IModalWindowProps, {}> {
	static defaultProps: IModalWindowProps;

	constructor(props: any) {
		super(props);
	}

	getButtonConfig(buttonType: ButtonType): ButtonConfig {

		for (let i = 0; i < ButtonList.length; i++) {
			let item = ButtonList[i];
			if (item.btnType == buttonType)
				return item;
		}

		return ButtonList[0];
	}

	getHeaderElem = (): any => {
		let headerElem = (this.props.closeButton) ?
			<Modal.Header closeButton>
				<Modal.Title>{this.props.caption}</Modal.Title>
			</Modal.Header>
			:
			<Modal.Header>
				<Modal.Title>{this.props.caption}</Modal.Title>
			</Modal.Header>
			;

		return headerElem;
	}

	getButtonsElem = (): any => {
		let buttonsElem = this.props.buttonList.map((btn: ButtonType, btnIndex: number) => {
			let config = this.getButtonConfig(btn);

			return (
				<Button key={btnIndex}
					variant={config.variant}
					onClick={() => this.props.onHandleBtnClick(config.btnType)}>
					{config.text}
				</Button>
			);
		});

		return buttonsElem;
	}

	render() {
		let header = (this.props.show) ? this.getHeaderElem() : null;
		let buttons = (this.props.show) ? this.getButtonsElem() : null;

		return (
			<Modal
				show={this.props.show}
				centered={this.props.centered}
				size={this.props.size}
				animation={true}
				onHide={this.props.onHandleClose}>

				{header}

				<Modal.Body>
					{this.props.text}
					{this.props.element}
				</Modal.Body>

				<Modal.Footer>
					{buttons}
				</Modal.Footer>
			</Modal>
		)
	}

}

ModalWindow.defaultProps = {
	show: false,
	onHandleClose: () => { alert('onHandleClose is undefined!') },
	onHandleBtnClick: (btnType: ButtonType) => { alert('onHandleBtnClick is undefined!') },
	buttonList: [ButtonType.BTN_OK],
	caption: '',
	text: '',
	element: null,

	closeButton: true,
	size: undefined,
	centered: true
};

export default ModalWindow;