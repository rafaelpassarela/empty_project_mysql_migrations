import * as React from 'react';
import BaseViewComponent from '../../components/base.view.component';
import PageFrame from '../../components/pageframe.component';
import ValuesController from './values.page.controller';

class ValuesPage extends BaseViewComponent {

	constructor(props: any) {
		super(props);
	}

	protected getTitle(): string {
		return 'Values List';
	}

	render() {
		return (
			<PageFrame >
				<ValuesController />
			</PageFrame>
		);
	}

}

export default ValuesPage;