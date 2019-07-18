import * as React from 'react';
import {} from './modalwindow.component';
import LocalizationConfig from '../configurations/localization.config';
import ModalWindow from './modalwindow.component';
//import { ButtonType } from './button.config';

interface IDeleteModalProp {
	show: boolean,
	caption?: string,
	text: string 
}

interface IDeleteModalState {

}

class DeleteModal extends React.Component<IDeleteModalProp, IDeleteModalState> {
	static defaultProps: IDeleteModalProp;

	constructor(props: any) {
		super(props);
	}

	render() {
		let dialog = (this.props.show) ? <ModalWindow show={true} /> : null;

		return (
		        <div>{dialog}</div>
		);
	}
}

DeleteModal.defaultProps = {
	show: false,
	caption: LocalizationConfig.deleteCaption,
	text: ''
}

export  default DeleteModal;