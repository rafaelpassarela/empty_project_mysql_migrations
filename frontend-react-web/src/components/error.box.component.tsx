import * as React from 'react';
import { Alert, Glyphicon } from 'react-bootstrap';

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

	constructor(props: any) {
		super(props);

		this.isValid = this.isValid.bind(this);
		this.getFixedMode = this.getFixedMode.bind(this);
		this.getDynamicMode = this.getDynamicMode.bind(this);
	}

	isValid(value?: string) {
		return (value != '' && value != undefined);
	}

	getFixedMode() {
		if (!this.isValid(this.props.errorMessage)) return null;

		let icon = (this.isValid(this.props.icon)) ? <Glyphicon glyph={String(this.props.icon)} style={{paddingRight: 10}}/> : null;

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
			<Alert bsStyle="danger">
				<div>{caption}</div>
				{msg}
			</Alert>

		);
	}

	getDynamicMode() {
		if (!this.isValid(this.props.errorMessage)) return null;

		return <div><i>DYN - {this.props.errorMessage}</i></div>;
	}

	render() {
		let msg = (this.props.mode == ErrorMode.EM_FIXED) ? this.getFixedMode() : this.getDynamicMode();

		return msg;
	}

}

export default ErrorBox;