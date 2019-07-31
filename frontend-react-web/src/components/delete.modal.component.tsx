import * as React from 'react';
import {} from './modalwindow.component';
import LocalizationConfig from '../configurations/localization.config';
import ModalWindow from './modalwindow.component';
import { ButtonType } from '../configurations/button.config';

interface IDeleteModalProp {
	show: boolean,
	caption?: string,
	text: string 
	onHandleClose: () => void,
	onHandleDelete: () => void,
}

interface IDeleteModalState {

}

class DeleteModal extends React.Component<IDeleteModalProp, IDeleteModalState> {
	static defaultProps: IDeleteModalProp;

	constructor(props: any) {
		super(props);

		this.deleteAction = this.deleteAction.bind(this);
	}

	deleteAction = (btnType: ButtonType) => {
		if (btnType == ButtonType.BTN_YES) {
			this.props.onHandleDelete();
		} else {
			this.props.onHandleClose();
		}	
	}

	render() {
		let dialog = (this.props.show) ? 
			<ModalWindow 
				show={true}
				centered={false}
				caption={this.props.caption}
				text={this.props.text}
				icon="exclamation-circle"
				buttonList={[ButtonType.BTN_YES, ButtonType.BTN_NO]}
				onHandleClose={this.props.onHandleClose}
				onHandleBtnClick={this.deleteAction}
			/> : null;

		return (
		        <div>{dialog}</div>
		);
	}
}

DeleteModal.defaultProps = {
	show: false,
	caption: LocalizationConfig.deleteCaption,
	text: '',
	onHandleClose: () => {},
	onHandleDelete: () => {}
}

export  default DeleteModal;