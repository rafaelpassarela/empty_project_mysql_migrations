export class ViewDetailItemSelection {
	value: number | string
	caption: string;
}

export class ViewDetailItemValidation {
	invalidMessage?: string;
	validMessage?: string;
}

export class ViewDetailItemOptions {
	maxLength?: number;
	min?: number;
	max?: number;
	rows?: number;
	pattern?: string;
	radioInLine?: boolean;	
	step?: number;
	validationMessages?: ViewDetailItemValidation;	
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
		| 'file-multiple'
		| 'month'
		| 'number'
		| 'password'
		| 'radio'
		| 'range'
		| 'select-list'
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