import LocalizationConfig from './localization.config';

export enum ButtonType {
	BTN_OK,
	BTN_YES,
	BTN_NO,
	BTN_CANCEL,	
	BTN_SAVE,
	BTN_CLOSE,
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
	{
		text: LocalizationConfig.save,
		variant: 'success',
		btnType: ButtonType.BTN_SAVE
	},
	{
		text: LocalizationConfig.close,
		variant: 'warning',
		btnType: ButtonType.BTN_CLOSE
	}
];

export function getButtonConfig(buttonType: ButtonType): ButtonConfig {
	for (let i = 0; i < ButtonList.length; i++) {
		let item = ButtonList[i];
		if (item.btnType === buttonType)
			return item;
	}

	return ButtonList[0];

}

export default ButtonList;