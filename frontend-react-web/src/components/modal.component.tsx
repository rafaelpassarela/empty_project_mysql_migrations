import * as React from 'react';

type ModalProps = {
	show: boolean,
	caption?: string,
	text?: string,
	element?: any
}

class Modal extends React.Component<ModalProps, {}> {

	render() {
		// cloneElement(wrapper, {
		//         ...wrapper.props,
		//         children
		//       })		
		if (this.props.show) {
			return <div>MODAL {this.props.caption} <br />{this.props.element}</div>
		}
		return null;
	}



}

export default Modal;