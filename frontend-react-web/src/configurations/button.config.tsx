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
		text: 'Ok',
		variant: 'primary',
		btnType: ButtonType.BTN_OK
	},
	{
		text: 'Yes',
		variant: 'success',
		btnType: ButtonType.BTN_YES
	},
	{
		text: 'No',
		variant: 'danger',
		btnType: ButtonType.BTN_NO
	},
	{
		text: 'Cancel',
		variant: 'warning',
		btnType: ButtonType.BTN_CANCEL
	},
];

export default ButtonList;