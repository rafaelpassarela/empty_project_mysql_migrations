import * as React from 'react';

class BaseViewComponent<P = {}, S = {}> extends React.Component<P, S>{

	componentDidMount() {
		let name = this.getTitle();
		if (name != '') {
			name = ' - ' + name;
		} else {
			console.error('Component Page "' + this.constructor.name + '" doesn\'t have "protected getTitle() : string" function.');
		}

		document.title = 'Mr Rafael.ca' + name;
	}

	protected getTitle(): string {
		return '';
	}

}

export default BaseViewComponent;