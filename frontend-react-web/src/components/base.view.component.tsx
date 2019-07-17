import * as React from 'react';
import LocalizationConfig from '../configurations/localization.config';

abstract class BaseViewComponent<P = {}, S = {}> extends React.Component<P, S>{

	componentDidMount() {
		let name = this.getTitle();
		if (name != '') {
			name = ' - ' + name;
		}

		document.title = LocalizationConfig.companyName + name;
	}

	protected abstract getTitle(): string;

}

export default BaseViewComponent;