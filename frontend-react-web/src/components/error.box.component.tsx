import * as React from 'react';
import Glyphicon from './glyphicon.component';
import { Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

export enum ErrorMode {
	EM_FIXED,
	EM_DYNAMIC
}

type ErrorComponentProp = {
	errorMessage: string,
	caption?: string,
	mode?: ErrorMode
	icon?: string // https://getbootstrap.com/docs/3.3/components/
}

class ErrorBox extends React.Component<ErrorComponentProp, {}> {

	isValid = (value?: string) => {
		return (value != '' && value != undefined);
	}

	generateMessage = () => {
		let icon = (this.isValid(this.props.icon)) ?
			<Glyphicon glyph={String(this.props.icon)} style={{ paddingRight: 10 }} /> : null;

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
			<Alert bsStyle="danger">
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
		let msg = (this.props.mode == ErrorMode.EM_FIXED) ? this.getFixedMode() : this.getDynamicMode();

		return msg;
	}

}

export default ErrorBox;