import * as React from 'react';
import Glyphicon from './glyphicon.component';
import Alert from 'react-bootstrap/Alert';
import { toast } from 'react-toastify';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IMessageBoxComponentProp extends React.Props<IMessageBoxComponentProp> {
	message: string,
	msgType: 'error' | 'info'	
	caption?: string,
	mode?: 'fixed' | 'dynamic',
}

class MessageBox extends React.Component<IMessageBoxComponentProp, {}> {

	static defaultProps: IMessageBoxComponentProp;

	isValid = (value?: string) => {
		return (value != '' && value != undefined);
	}

	getMessage = () : any => {		
		let mens = this.props.message.split('\n');
		let lineNum: number = 0;
		let res = mens.map( (item: string) => {
			lineNum += 1;
			return <p key={lineNum} style={{marginBottom: 0, marginTop: 0}}>{item}</p>
		});

		return res;
	}

	generateMessage = () => {
		let icoName: IconProp;
		switch (this.props.msgType) {
			case 'error':
			  	icoName = 'times-circle';
				break;
			default: 
				// info
				icoName = 'info-circle';
				break;
		}

		let icon = <Glyphicon glyph={icoName} style={{ paddingRight: 10, width: 40 }} />;

		let caption = null;
		if (this.isValid(this.props.caption)) {
			caption = <h4>{icon}{this.props.caption}</h4>
		}

		let msg = null;
		if (this.isValid(this.props.caption)) {
			msg = <div>{this.getMessage()}</div>;
		} else {
			msg = <div>{icon}{this.getMessage()}</div>;
		}

		return (
			<div>
				<div>{caption}</div>
				{msg}
			</div>
		);

	}

	getFixedMode = () => {
		if (!this.isValid(this.props.message)) return null;

		let msg = this.generateMessage();
		let varName: 
			| 'primary'
    		| 'secondary'
    		| 'success'
    		| 'danger'
    		| 'warning'
    		| 'info'
    		| 'dark'
    		| 'light';

		switch (this.props.msgType) {
			case 'error':
				varName = 'danger';
				break;			
			default:
				// 'info'
				varName = 'success'
				break;
		}

		return (
			<Alert variant={varName} dismissible>
				{msg}
			</Alert>
		);
	}

	getDynamicMode = () => {
		if (!this.isValid(this.props.message)) return null;

		switch (this.props.msgType) {
			case 'error':
				toast.error(this.generateMessage());
				break;			
			default:
				// 'info'
				toast.success(this.generateMessage());
				break;
		}

		// toast is your message !		
		return null; 
	}

	render() {
		let msg = (this.props.mode == 'fixed') ? this.getFixedMode() : this.getDynamicMode();

		return msg;
	}
}

MessageBox.defaultProps = {
	message: '',
	msgType: 'info',
	mode: 'dynamic'
}

export default MessageBox;