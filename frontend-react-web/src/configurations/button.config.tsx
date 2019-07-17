import LocalizationConfig from './localization.config';

export enum ButtonType {
	BTN_OK,
	BTN_YES,
	BTN_NO,
	BTN_CANCEL
}

export class ButtonConfig {
	public text: string;
	public btnType: ButtonType;
	public variant:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'danger'
		| 'warning'
		| 'info'
		| 'dark'
		| 'light'
		| 'link'
		| 'outline-primary'
		| 'outline-secondary'
		| 'outline-success'
		| 'outline-danger'
		| 'outline-warning'
		| 'outline-info'
		| 'outline-dark'
		| 'outline-light';
}

let ButtonList: Array<ButtonConfig> = [
	{
		text: LocalizationConfig.ok,
		variant: 'primary',
		btnType: ButtonType.BTN_OK
	},
	{
		text: LocalizationConfig.yes,
		variant: 'success',
		btnType: ButtonType.BTN_YES
	},
	{
		text: LocalizationConfig.no,
		variant: 'danger',
		btnType: ButtonType.BTN_NO
	},
	{
		text: LocalizationConfig.cancel,
		variant: 'warning',
		btnType: ButtonType.BTN_CANCEL
	},
];

export default ButtonList;