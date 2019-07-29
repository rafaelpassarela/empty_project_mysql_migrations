import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LocalizationConfig from '../configurations/localization.config';
import BaseViewComponent from './base.view.component';
// Api
import ApiBase from '../client-api/api-base';
import { BaseModel } from '../client-api/api-models';
// Controls
import Loading from './loading.component';
import MessageBox from './message.box.component';
// Form Render
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


interface IBaseViewDetailComponentProps<T extends BaseModel> extends RouteComponentProps {
	id: any,
	currentObject: T | null
}

interface IBaseViewDetailComponentState<T extends BaseModel> extends React.Props<IBaseViewDetailComponentState<T>> {
	currentObject: T | null,
	isLoading: boolean,
	errorMsg: string | undefined,
	message: string | undefined,	
}

class ViewDetailItemSelection {
	value: number | string;
	caption: string;
}

class ViewDetailItemOptions {
	maxLength?: number;
	min?: number;
	max?: number;
	rows?: number;
	pattern?: string;
	step?: number;
	selectionItens?: ViewDetailItemSelection[];
}

export class ViewDetailItem {
	fieldName: string;
	caption: string;
	type: 'color'
		| 'combobox'
		| 'checkbox'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'month'
		| 'number'
		| 'password'
		| 'radio'
		| 'range'
		| 'text' 
		| 'tel'
		| 'time'
		| 'textarea'
		| 'url'
		| 'week';
	placeHolder?: string;
	required?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	options?: ViewDetailItemOptions
}

abstract class BaseViewDetailComponent<T extends BaseModel> 
	extends BaseViewComponent<IBaseViewDetailComponentProps<T>, IBaseViewDetailComponentState<T>> {

	constructor(props: any) {
		super(props);

		this.state = {
			currentObject: this.props.currentObject,
			isLoading: true,
			errorMsg: '',
			message: ''
		}

		this.getCurrentItem = this.getCurrentItem.bind(this);
		this.loadDetailObject = this.loadDetailObject.bind(this);
		this.getHeader = this.getHeader.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.getParamID = this.getParamID.bind(this);
		this.initLoading = this.initLoading.bind(this);
		this.getDetailForm = this.getDetailForm.bind(this);
		this.getFormImput = this.getFormImput.bind(this);
	}

	protected abstract getPageTitle(): string;
	protected abstract getDescription(): string;
	protected abstract getViewItemsList() : ViewDetailItem[];
	protected abstract getLoadindMessage(): string;
	protected abstract getApi(): ApiBase<T>;

	protected getCurrentItem(canInitialize: boolean) : T {
		let obj : T;
		obj = (this.state.currentObject || this.props.currentObject) as T;

		if (canInitialize && obj == undefined) {
			let tmp = {} as T;
			obj = obj || tmp;
		}

		return obj;
	}

	componentDidMount() {
		super.componentDidMount();

		let id = this.getParamID();
		if (id != undefined) {
			this.loadDetailObject(id);
		} else {
			this.setState({
				isLoading: false,
				currentObject: {} as T,
				message: '',
				errorMsg: ''
			});
		}
	}

	loadDetailObject = (id: any) => {
		this.getApi().get(
			(data: any) => {
				this.setState({
					currentObject: data,
					isLoading: false,
					errorMsg: undefined,
					message: undefined,
				});
			},
			(error: Error) => {
				this.setState({					
					isLoading: false,
					message: undefined,
					errorMsg: error.message
				});
			},
			'/' + id
		);
	}

	getHeader = () => {
		let textDesc = this.getDescription();
		let textCaption = this.getPageTitle();

		let description = (textDesc != '') ? <small><small>{textDesc}</small></small> : null;

		return (textCaption != '') ? <h2>{textCaption} {description}</h2> : null;
	}	

	getParamID = () => {
		return this.props.match.params['id'] | this.props.id;
	}

	initLoading = () => {
		return (
			<Loading
				active={this.state.isLoading}
				caption={LocalizationConfig.waitCaption}
				message={this.getLoadindMessage()}
				variant="primary" />
		)
	}

	initErrorMessage = () => {
		// create the ErrorBox component
		if (this.state.errorMsg != '' && this.state.errorMsg != undefined) {
			return <MessageBox message={this.state.errorMsg} caption={LocalizationConfig.error} msgType='error' mode='dynamic'/>;
		} else {
			return null;
		}
	}

	initInfoMessage = () => {
		// create the InfoBox component
		if (this.state.message != '' && this.state.message != undefined) {
			return <MessageBox message={this.state.message} caption={LocalizationConfig.attention} msgType='info' mode='dynamic' />;
		} else {
			return null;
		}
	}

	handleChange(event: any) {
		let obj = this.getCurrentItem(true);

		let prop = event.target.name;
		let value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;

        //for multiple select -> value = [...target.selectedOptions].map(x => x.value)

		obj[prop] = value;

		this.setState({
			currentObject: obj
		});
	}

	handleKeyPress(event: any) {
		// <input type="number" onKeyDown="if(this.value.length==2) return false;" />
		const numKeys = ['0', '1', '3', '4', '5', '6', '7', '8', '9', '.', ','];

		if (event.currentTarget != undefined && numKeys.indexOf(event.key) > -1) {

			const maxLen = Math.max(event.currentTarget.max.length, event.currentTarget.maxLength);
			if (maxLen > 0) {
				let res = event.currentTarget.value.length < maxLen;
				if (!res) {
					event.key = '';
					event.keyCode = 0;
				}
			}
		}

		return true;
	}

	getFormImput(item: ViewDetailItem, object: T) : any {
		let options = item.options || {} as ViewDetailItemOptions;
		// let list = options.selectionItens || [] as ViewDetailItemSelection[];

		switch (item.type) {
/*		| 'color' 
		| 'combobox'
		| 'checkbox'
		| 'date'
		| 'datetime-local'
		= 'email'
		| 'file'
		| 'month'
		= 'number'
		= 'password'
		| 'radio'
		| 'range'
		= 'text' 
		| 'tel'
		| 'time'
		| 'textarea'
		| 'url'
		| 'week';			*/
			case "checkbox":
				return <div>{item.type}</div>
				break;

			case "combobox":
				return <div>{item.type}</div>
				break;

			case "date":
				return <div>{item.type}</div>
				break;

			case "email":			
			case "password":
			case "text":
				return <Form.Control 
							name={item.fieldName}
							type={item.type}
							disabled={item.disabled}
							readOnly={item.readOnly}
							required={item.required}
							placeholder={item.placeHolder}
							maxLength={options.maxLength}
							value={object[item.fieldName]}
							onChange={this.handleChange}
						/>
				break;
			case "number":
//maxlength="2" for numbers
// <input type="number" onKeyDown="if(this.value.length==2) return false;" />			
				return <Form.Control 
							name={item.fieldName}
							type={item.type}
							disabled={item.disabled}
							readOnly={item.readOnly}
							required={item.required}
							placeholder={item.placeHolder}
							min={options.min}
							max={options.max}
							value={object[item.fieldName]}
							onChange={this.handleChange}
							onKeyDown={this.handleKeyPress}
						/>
				break;
			case "radio":
				return <div>{item.type}</div>
				break;

			case "textarea":
				return <Form.Control
							name={item.fieldName}
							as="textarea"
							disabled={item.disabled}
							readOnly={item.readOnly}
							required={item.required}
							placeholder={item.placeHolder}
							maxLength={options.maxLength}
							value={object[item.fieldName]}
							onChange={this.handleChange}
							rows={options.rows || 3}
						/>
				break;
			default:				
				return <div>Invalid type for ViewDetailItem = {item.type}</div>;
				break;
		}
	}

	getDetailForm = () => {
		let list = this.getViewItemsList();
		let key: number = 0;
		let obj: T = this.getCurrentItem(true);
		return (
			<Form>
				{list.map( (item: ViewDetailItem) => {
						return (
							<Form.Group key={key++} as={Row} controlId={"form_" + item.fieldName}>
								<Form.Label column>
										{item.caption}
								</Form.Label>
								<Col sm={10}>
									{this.getFormImput(item, obj)}
								</Col>									
							</Form.Group>
						);
					}
				)}
				<Button type="submit">Sign in</Button>
			</Form>
/*
  <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column>
      Email
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="email" placeholder="Email" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formHorizontalPassword">
    <Form.Label column>
      Password
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="password" placeholder="Password" />
    </Col>
  </Form.Group>
  <fieldset>
    <Form.Group as={Row}>
      <Form.Label column >
        Radios
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="first radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
        <Form.Check
          type="radio"
          label="second radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
        <Form.Check
          type="radio"
          label="third radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
        />
      </Col>
    </Form.Group>
  </fieldset>
  <Form.Group as={Row} controlId="formHorizontalCheck">
    <Col sm={{ span: 10, offset: 2 }}>
      <Form.Check label="Remember me" />
    </Col>
  </Form.Group>

  <Form.Group as={Row}>
    <Col sm={{ span: 10, offset: 2 }}>
      <Button type="submit">Sign in</Button>
    </Col>
  </Form.Group>
</Form>
*/
		);
	}

	protected doRender() : any {
		const loading = this.initLoading();
		const error = this.initErrorMessage();
		const message = this.initInfoMessage();
		const form = (this.getCurrentItem(false) != null) ? this.getDetailForm() : null;

		return (
			<div>
				{loading}
				{error}
				{message}
				{this.getHeader()}
				<hr />
				{form}
				{JSON.stringify(this.getCurrentItem(true), null, 2)}
			</div>
		)
	}

}

export default BaseViewDetailComponent;