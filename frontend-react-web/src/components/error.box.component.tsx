import * as React from 'react';
import Glyphicon from './glyphicon.component';
import Alert from 'react-bootstrap/Alert';
import { toast } from 'react-toastify';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IErrorComponentProp extends React.Props<IErrorComponentProp> {
	errorMessage: string,
	caption?: string,
	mode?: 'fixed' | 'dynamic',
	icon?: IconProp
}

class ErrorBox extends React.Component<IErrorComponentProp, {}> {

	static defaultProps: IErrorComponentProp;

	isValid = (value?: string) => {
		return (value != '' && value != undefined);
	}

	generateMessage = () => {

		let icon = (this.props.icon != undefined) ?
			<Glyphicon glyph={this.props.icon} style={{ paddingRight: 10 }} /> : null;

		let caption = null;
		if (this.isValid(this.props.caption)) {
			caption = <h4>{icon}{this.props.caption}</h4>
		}

		let msg = null;
		if (this.isValid(this.props.caption)) {
			msg = <p>{this.props.errorMessage}</p>;
		} else {
			msg = <p>{icon}{this.props.errorMessage}</p>;
		}

		return (
			<div>
				<div>{caption}</div>
				{msg}
			</div>
		);

	}

	getFixedMode = () => {
		if (!this.isValid(this.props.errorMessage)) return null;

		let msg = this.generateMessage();

		return (
			<Alert variant="danger">
				{msg}
			</Alert>
		);
	}

	getDynamicMode = () => {
		if (!this.isValid(this.props.errorMessage)) return null;

		toast.error(this.generateMessage());
		return null; // toast is your message !
	}

	render() {
		let msg = (this.props.mode == 'fixed') ? this.getFixedMode() : this.getDynamicMode();

		return msg;
	}
}

ErrorBox.defaultProps = {
	errorMessage: "",
	mode: "dynamic"
}

export default ErrorBox;