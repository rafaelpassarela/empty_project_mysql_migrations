import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoadingSmall from './loading.small.component';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Glyphicon from './glyphicon.component';
import { getButtonConfig, ButtonType } from '../configurations/button.config';

export interface IModalWindowProps extends React.Props<IModalWindowProps> {
	show: boolean,
	onHandleClose: () => void,
	onHandleBtnClick: (btnType: ButtonType) => void,
	buttonList: Array<ButtonType>,
	caption?: string,
	captionDetail?: string,
	text?: string,
	element?: any,
	footerElement?: any,
    icon?: IconProp,
	closeButton?: boolean,
	size?: 'sm' | 'lg', // | 'xl',
	customClassName?: string,
	centered?: boolean
	easyClose?: boolean // if true, close the modal window on click outside or press ESC key
}

interface IModalWindowState extends React.Props<IModalWindowState> {
	enabled: boolean,
	clickedButton: ButtonType | undefined
}

const iconDivStyle = {
	paddingRight: 10,
	fontSize: 46,
	top: 7,
	position: 'absolute'
}

class ModalWindow extends React.Component<IModalWindowProps, IModalWindowState> {
	static defaultProps: IModalWindowProps;

	constructor(props: any) {
		super(props);

		this.state = {
			enabled: true,
			clickedButton: undefined
		}

		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	getHeaderElem = (): any => {

		let icon = (this.props.icon !== undefined) ?
			<Glyphicon glyph={this.props.icon} style={iconDivStyle} /> : null;

		let subCaption = (this.props.captionDetail !== '') ? <small><small>{this.props.captionDetail}</small></small> : null;

		let caption = (
			<div style={(this.props.icon !== undefined) ? {position: 'absolute', left: 60} : undefined}>
				{this.props.caption} {subCaption}
			</div>
		);

		let headerElem = (this.props.closeButton) ?
			<Modal.Header closeButton>
				<Modal.Title>{icon}{caption}</Modal.Title>
			</Modal.Header>
			:
			<Modal.Header>
				<Modal.Title>{icon}{caption}</Modal.Title>
			</Modal.Header>
			;

		return headerElem;
	}

	handleButtonClick = (btnType: ButtonType) => {
		this.setState({
			enabled: false,
			clickedButton: btnType
		});

		this.props.onHandleBtnClick(btnType);
	}

	getButtonsElem = (): any => {

		let buttonsElem = this.props.buttonList.map((btn: ButtonType, btnIndex: number) => {
			let config = getButtonConfig(btn);

			let load = (!this.state.enabled && config.btnType === this.state.clickedButton) ? 
				<LoadingSmall active={true}/> : null;

			return (
				<Button key={btnIndex}
					variant={config.variant}
					disabled={!this.state.enabled}
					onClick={() => this.handleButtonClick(config.btnType)}>
					{load}{config.text}
				</Button>
			);
		});

		return (buttonsElem.length > 0 || this.props.footerElement !== undefined) 
			? (<Modal.Footer>{buttonsElem}{this.props.footerElement}</Modal.Footer>) 
			: null;
	}

	render() {
		let header = (this.props.show) ? this.getHeaderElem() : null;
		let buttons = (this.props.show) ? this.getButtonsElem() : null;
		
		return (
			<Modal
				keyboard={this.props.easyClose}
				backdrop={(this.props.easyClose) ? true : 'static'}
				show={this.props.show}
				centered={this.props.centered}
				size={this.props.size}
				dialogClassName={this.props.customClassName}
				animation={true}
				onHide={this.props.onHandleClose}>

				{header}

				<Modal.Body>
					<span style={{whiteSpace: "pre-line"}}>{this.props.text}</span>
					{this.props.element}
				</Modal.Body>

				{buttons}
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
	centered: true,
	easyClose: false
};

export default ModalWindow;