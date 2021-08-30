import * as React from 'react';
import { Redirect } from 'react-router-dom';
import * as queryString from 'query-string';
import LocalizationConfig from '../configurations/localization.config';
import BaseViewComponent, { IBaseViewProps } from './base.view.component';
import {
	ViewDetailItem,
	ViewDetailItemOptions,
	ViewDetailItemSelection,
	ViewDetailItemValidation } from './base.view.types';
import { fileUtils, IFileModel } from '../helpers/file.utils.helper';
import { formHelper } from '../helpers/form.helper';
// Api
import { BaseModel } from '../client-api/api-models';
// Controls
import Loading from './loading.component';
import LoadingSmall from './loading.small.component';
import MessageBox from './message.box.component';
import ModalWindow from './modalwindow.component';
import { getButtonConfig, ButtonType } from '../configurations/button.config';
// Form Render
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { parse } from 'path-to-regexp';

interface IBaseViewDetailComponentProps<T extends BaseModel> extends IBaseViewProps /*RouteComponentProps*/ {
	id: any,
	currentObject: T | null,
	onSaveCallbackHandle: (message: string, isError : boolean, dataObject: T | null) => void,
	onCloseCallbackHandle: () => void,
}

interface IBaseViewDetailComponentState<T extends BaseModel> extends React.Props<IBaseViewDetailComponentState<T>> {
	currentObject: T | null,
	isLoading: boolean,
	enabled: boolean,
	formValid: boolean,
	errorMsg: string | undefined,
	message: string | undefined,
	clickedButton: ButtonType | undefined
}

abstract class BaseViewDetailComponent<T extends BaseModel> 
	extends BaseViewComponent<IBaseViewDetailComponentProps<T>, IBaseViewDetailComponentState<T>> {

	constructor(props: any) {
		super(props);

		this.state = {
			currentObject: this.props.currentObject,
			isLoading: true,
			enabled: true,
			formValid: false,
			errorMsg: '',
			message: '',
			clickedButton: undefined
		}

		this.canPerformSubmit = this.canPerformSubmit.bind(this);
		this.createNewObjectFromFields = this.createNewObjectFromFields.bind(this);
		this.getCurrentItem = this.getCurrentItem.bind(this);
		this.loadDetailObject = this.loadDetailObject.bind(this);
		this.saveDetailObject = this.saveDetailObject.bind(this);
		this.doValidateForm = this.doValidateForm.bind(this);
		this.getHeader = this.getHeader.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.getParamID = this.getParamID.bind(this);
		this.initLoading = this.initLoading.bind(this);
		this.getDetailForm = this.getDetailForm.bind(this);
		this.getFormImput = this.getFormImput.bind(this);
		this.getValidationMessages = this.getValidationMessages.bind(this);
	}

	protected abstract getPageTitle(): string;
	protected abstract getDescription(): string;
	protected abstract getViewItemsList(): Array<ViewDetailItem>;
	protected abstract getLoadindMessage(): string;
	protected abstract onGetItem(key: any): Promise<T>;
	protected abstract onSaveItem(item: T): Promise<T>;

	protected canPerformSubmit(): boolean {
		// prevent the form submit event
		// keep it false for local process, loke call an API and pass the JSON value
		return false;
	}

	componentDidMount() {
		super.componentDidMount();

		let id = this.getParamID();
		if (id !== undefined && id !== "") {
			this.loadDetailObject(id);
		} else {
			this.setState({
				isLoading: false,
				currentObject: this.getCurrentItem(true),
				message: '',
				errorMsg: ''
			}, () => {this.doValidateForm()});
		}
	}

	/* Fix: A component is changing an uncontrolled input of type text to be controlled */
	private createNewObjectFromFields = (): T => {
		let obj: {[index: string]:any} = {} as T;
		// let obj = {} as T;
		let list = this.getViewItemsList();	
		list.map((item: ViewDetailItem, i: number) => {
			return obj[item.fieldName] = '';
		} );

		return obj as T;
	}

	private getCurrentItem(canInitialize: boolean) : T {
		let obj : T;
		obj = (this.state.currentObject || this.props.currentObject) as T;

		if (canInitialize && obj === undefined) {
			let tmp = this.createNewObjectFromFields();
			obj = obj || tmp;
		}

		return obj;
	}

	private canChangeObjectValues : boolean = true;	

	private loadDetailObject(id: any) {
		this.onGetItem(id)
			.then( (value: T) => {
				this.setState({
					currentObject: value,
					isLoading: false,
					errorMsg: undefined,
					message: undefined,
					enabled: true,
				}, () => {this.doValidateForm()});
			})
			.catch( (error: Error) => {
				this.setState({
					isLoading: false,
					message: undefined,
					errorMsg: error.message,
					enabled: true,
				}, () => {this.doValidateForm()});
			});
	}

	private saveDetailObject() {
		this.onSaveItem(this.getCurrentItem(false))
			.then((data: T) => {
				this.setState({
					currentObject: data,
					isLoading: false,
					errorMsg: undefined,
					message: LocalizationConfig.itemWasSaved,
					enabled: true,
					clickedButton: undefined
				});
				if (this.isEmbedded()) {
				 	this.props.onSaveCallbackHandle(LocalizationConfig.itemWasSaved, false, data as T);
				}
			})
			.catch((error: Error) => {
				this.setState({
					isLoading: false,
					message: undefined,
					errorMsg: error.message,
					enabled: true,
					clickedButton: undefined
				});
				if (this.isEmbedded()) {
					this.props.onSaveCallbackHandle(LocalizationConfig.itemWasSaved, true, null);
				}
			});
	}

	getHeader = () => {
		if (this.isEmbedded()) {
			return null
		} else {
			let textDesc = this.getDescription();
			let textCaption = this.getPageTitle();

			let description = (textDesc !== '') ? <small><small>{textDesc}</small></small> : null;

			if (textCaption === '') {
				return null;
			}

			return (
				<div className="modal-header">
					<h2>{textCaption} {description}</h2>
				</div>
			);
		}
	}

	getParamID = () => {
		if (this.props.match !== undefined) {
			console.log(this.props.match.params);
			const parsed = queryString.parse(window.location.search);

			console.log(parsed);
			console.log(parsed.id);

			return (parsed.id == null) ? this.props.id : parsed.id;
		}
		
		return this.props.id;
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
		if (this.state.errorMsg === "404 - Not Found") {
			return <Redirect to="/RecordNotFound" />
		}

		if (this.state.errorMsg !== '' && this.state.errorMsg !== undefined) {
			return (
				<MessageBox 
					message={this.state.errorMsg}
					caption={LocalizationConfig.error}
					msgType='error'
					mode='dynamic'
				/>
			);
		} else {
			return null;
		}
	}

	initInfoMessage = () => {
		// create the InfoBox component
		if (this.state.message !== '' && this.state.message !== undefined) {
			return <MessageBox message={this.state.message} caption={LocalizationConfig.attention} msgType='info' mode='dynamic' />;
		} else {
			return null;
		}
	}

	doValidateForm = () => {
		let valid: boolean = true;
		// Get the container element
		let container = document.getElementById(this.getFormName());

		valid = formHelper.checkRequiredFields(container, "input") 
			 && formHelper.checkRequiredFields(container, "textarea");

		this.setState({
			formValid: valid
		});
	}

	handleChange(event: any) {
		if (this.canChangeObjectValues === true) {
			const prop = event.target.name;
			let obj: {[index: string]:any} = this.getCurrentItem(true);
			// let obj = this.getCurrentItem(true);
			let updateObj = true;
			let value = undefined;

			switch (event.target.type) {
				case "checkbox":
					value = event.target.checked;
					break;
				case "select-one":
					value = (event.target.value === -1) ? undefined : event.target.value;
					break;
				case "select-multiple":
					value = new Array<string>();
					for (var i = 0; i < event.target.options.length; ++i) {
						if (event.target.options[i].selected) {
							value.push(event.target.options[i].value);
						}
					}
					break;
				case "file":
					console.log('need to refactor the File type')
					// updateObj = false;
					// if (event.target.multiple === true) {
					// 	// reset the image array
					// 	obj[prop] = [];
					// 	this.setState({
					// 		currentObject: obj
					// 	}, () => {this.doValidateForm()});

					// 	let list = event.target.files;
					// 	value = new Array<IFileModel>();
					// 	for (var i = 0; i < list.length; i++) {
					// 		let item = list.item(i);
					// 		if (item != null) {
					// 			fileUtils.asBase64(item, (val: IFileModel) => {
					// 				if (this.state.currentObject !== null) {
					// 					// copy current file array
					// 					value = this.state.currentObject[prop];
					// 					// add new value to array
					// 					value.push(val);
					// 					// update the state
					// 					obj[prop] = value;
					// 					this.setState({
					// 						currentObject: obj
					// 					}, () => {this.doValidateForm()});
					// 				}
					// 			});
					// 		}
					// 	}
					// } else {
					// 	fileUtils.asBase64(event.target.files[0], (val: IFileModel) => {
					// 		obj[prop] = val;
					// 		this.setState({
					// 			currentObject: obj
					// 		}, () => {this.doValidateForm()});
					// 	});
					// }
					break;

				default:
					value = event.target.value;
					break;
			}

			if (updateObj) {
				obj[prop] = value;
				this.setState({
					currentObject: obj as T
				}, () => {this.doValidateForm()});
			}
		} else {
			this.canChangeObjectValues = true;
		}
	}

	handleKeyPress(event: any) {
		const numKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ',', '-'];

		if (event.currentTarget !== undefined && numKeys.indexOf(event.key) > -1) {
			let maxLen = Math.max(event.currentTarget.max.length, event.currentTarget.maxLength);
			const val : string = event.currentTarget.value;

			if (maxLen > 0) {
				['.', ',', '-'].map( (char: string) => {
					if (val.indexOf(char) >= 0) 
					  return maxLen++;
					else 
					  return maxLen;
				});
			}

			if (maxLen > 0 && val.length >= maxLen) {
				let obj: {[index: string]:any} = this.getCurrentItem(false);
				obj[event.currentTarget.name] = val.substr(0, maxLen);

				this.setState({
					currentObject: obj as T
				}, () => {this.doValidateForm()});

				this.canChangeObjectValues = false;
				return false;
			}
		}
		return true;
	}

	handleSubmit(event: any) {
		const canSubmit = this.canPerformSubmit();

		if (!canSubmit || event.currentTarget.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	getValidationMessages(messages: ViewDetailItemValidation) {
		const validation = [];
		if (messages.invalidMessage !== undefined) {
			validation.push( <Form.Control.Feedback key="1" type="invalid">{messages.invalidMessage}</Form.Control.Feedback>);
		}

		if (messages.validMessage !== undefined) {
			validation.push( <Form.Control.Feedback key="2" type="valid">{messages.validMessage}</Form.Control.Feedback>);
		}
		return validation;
	}

	getFormImput(item: ViewDetailItem, object: T, key?: number) : any {
		const options = item.options || {} as ViewDetailItemOptions;
		const list = options.selectionItens || [] as ViewDetailItemSelection[];

		switch (item.type) {
			case "combobox":
			case "select-list":
				if (item.type === "combobox") {
					list.unshift({
						caption: item.placeHolder || '',
						value: -1
					});
				}

				return <Form.Control
							name={item.fieldName}
							as="select"
							multiple={item.type === "select-list"}
							disabled={item.disabled}
							readOnly={item.readOnly || !this.state.enabled}
							required={item.required}
							placeholder={item.placeHolder}
							value={object[item.fieldName]}
							onChange={this.handleChange}
						>
							{list.map( (option: ViewDetailItemSelection, i: number) => {
								return <option key={i} value={option.value}>{option.caption}</option>
							} ) }
						</Form.Control>

			case "checkbox":
				return	<Form.Group key={key} as={Row} controlId={"form_" + item.fieldName}>
							<Col sm={{ span: 10, offset: 2 }}>
								<Form.Check 
									custom
									name={item.fieldName}
									label={item.caption}
									disabled={item.disabled}
									readOnly={item.readOnly || !this.state.enabled}
									required={item.required}
									checked={[true, 'true', 't', 'yes', 'y', 1, '1'].indexOf(object[item.fieldName]) > -1}
									onChange={this.handleChange}
								/>
								{this.getValidationMessages(options.validationMessages || {} as ViewDetailItemValidation)}
							</Col>
						</Form.Group>

			case "file":
			case "file-multiple":
				return <Form.Control 
							name={item.fieldName}
							type="file"
							disabled={item.disabled}
							readOnly={item.readOnly || !this.state.enabled}
							required={item.required}
							placeholder={item.placeHolder}
							maxLength={options.maxLength}
							multiple={item.type === "file-multiple"}
							onChange={this.handleChange}
							accept={options.fileMask}
						/>

			case "color":
			case "date":
			case "datetime-local":
			case "email":
			case "month":
			case "password":
			case "tel":
			case "time":
			case "text":
			case "url":
			case "week":
				return <Form.Control 
							name={item.fieldName}
							type={item.type}
							disabled={item.disabled}
							readOnly={item.readOnly || !this.state.enabled}
							required={item.required}
							placeholder={item.placeHolder}
							maxLength={options.maxLength}
							value={object[item.fieldName]}
							onChange={this.handleChange}
						/>

			case "number":
			case "range":
				return <Form.Control 
							name={item.fieldName}
							type={item.type}
							disabled={item.disabled}
							readOnly={item.readOnly || !this.state.enabled}
							required={item.required}
							placeholder={item.placeHolder}
							min={options.min}
							max={options.max}
							value={object[item.fieldName]}
							onChange={this.handleChange}
							onKeyDown={this.handleKeyPress}
						/>

			case "radio":
				return <fieldset key={key}>
							<Form.Group as={Row} controlId={"form_" + item.fieldName}>
								<Form.Label column >
									{item.caption}
								</Form.Label>
								<Col sm={10} className="radio-center">
									{
										list.map( (optItem: ViewDetailItemSelection, i: number) => {
											return (
												<Form.Check 
													custom
													key={key + '-' + i}
													type="radio"
													label={optItem.caption}
													value={optItem.value}
													name={item.fieldName}
													disabled={item.disabled || item.readOnly || !this.state.enabled}
													id={item.fieldName + '-' + optItem.value}
													inline={options.radioInLine}
													checked={optItem.value === object[item.fieldName]}
													onChange={this.handleChange}
												/>
											)
										})
									}
									{this.getValidationMessages(options.validationMessages || {} as ViewDetailItemValidation)}
								</Col>
							</Form.Group>
						</fieldset>

			case "textarea":
				return <Form.Control
							name={item.fieldName}
							as="textarea"
							disabled={item.disabled}
							readOnly={item.readOnly || !this.state.enabled}
							required={item.required}
							placeholder={item.placeHolder}
							maxLength={options.maxLength}
							value={object[item.fieldName]}
							onChange={this.handleChange}
							rows={options.rows || 3}
						/>
			case "custom":
				return (item.customConstructor !== undefined) 
					? item.customConstructor() 
					: <div>Custom Input Types needs a "customConstructor()" event</div>;
			default:
				return <div>Invalid type for ViewDetailItem = {item.type}</div>;
		}
	}

	private getFormName() : string {
		return "formReact_" + this.getPageTitle();
	}

	getDetailForm = () => {
		let key: number = 0;
		let list = this.getViewItemsList();
		let obj: T = this.getCurrentItem(true);

		return (
			<Form noValidate validated={true} onSubmit={this.handleSubmit} id={this.getFormName()}>
				{list.map( (item: ViewDetailItem) => {
					key++;
					let form = null;
					if (item.type === 'checkbox' || item.type === 'radio') {
						form = this.getFormImput(item, obj, key);
					} else {
						form = 
						<Form.Group key={key} as={Row} controlId={"form_" + item.fieldName}>
							<Form.Label column>
								{item.caption}
							</Form.Label>
							<Col sm={10}>
								{this.getFormImput(item, obj)}
								{this.getValidationMessages( 
									(item.options || {} as ViewDetailItemOptions).validationMessages 
									|| {} as ViewDetailItemValidation)}
							</Col>
						</Form.Group>
					}

					return form;
				} ) }
			</Form>
		);
	}

	isEmbedded = (): boolean => {
		return this.props.onSaveCallbackHandle !== undefined;
	}

	handleButtonClick = (btnType: ButtonType) => {
		this.setState({
			enabled: false,
			message: undefined,
			errorMsg: undefined,
			clickedButton: btnType
		});

		if (btnType === ButtonType.BTN_CLOSE) {
			if (this.isEmbedded()) {
				this.props.onCloseCallbackHandle();
			} else {
				this.props.history.goBack();
			}
		} else {
			this.saveDetailObject();
		}
	}

	getButtons = () => {
		let buttonsElem = [ButtonType.BTN_SAVE, ButtonType.BTN_CLOSE].map((btn: ButtonType, btnIndex: number) => {
			let config = getButtonConfig(btn);

			let load = (!this.state.enabled && config.btnType === this.state.clickedButton) ? 
				<LoadingSmall active={true}/> : null;

			let canSave: boolean = 
				(btn === ButtonType.BTN_SAVE) ? this.state.enabled && this.state.formValid
											  : this.state.enabled;

			return (
				<Button key={btnIndex}
					variant={config.variant}
					disabled={!canSave}
					onClick={() => this.handleButtonClick(config.btnType)}>
					{load}{config.text}
				</Button>
			);
		});

		return (
			<div className="modal-footer">
				{buttonsElem}
			</div>
		);
	}

	modalHandleClose = () => {
		this.setState({
			isLoading: false,
			message: undefined,
			errorMsg: undefined,
			enabled: true,
			clickedButton: undefined
		});

		if (this.props.onCloseCallbackHandle !== undefined) {
			this.props.onCloseCallbackHandle();
		}
	}

	protected doRender() : any {
		const loading = this.initLoading();
		const error = this.initErrorMessage();
		const message = this.initInfoMessage();
		const form = (this.getCurrentItem(false) != null) ? this.getDetailForm() : null;

		let result = 
			<div>
				{loading}
				{error}
				{message}
				{this.getHeader()}
				<div className={(this.isEmbedded()) ? "" : "modal-body"}>{form}</div>
				{this.getButtons()}
			</div>;

		if (this.isEmbedded()) {
			result = <ModalWindow
				show={true}
				size="lg"
				caption={this.getPageTitle()}
				captionDetail={this.getDescription()}
				icon="edit"
				centered={false}
				element={result}
				buttonList={[]}
				onHandleClose={this.modalHandleClose}
				onHandleBtnClick={undefined}
			/>
		}

		return result
		// {JSON.stringify(this.getCurrentItem(true), null, 2)}
	}

}

export default BaseViewDetailComponent;