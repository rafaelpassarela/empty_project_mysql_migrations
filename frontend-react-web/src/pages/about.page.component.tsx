import * as React from 'react';
import BaseViewComponent from '../components/base.view.component';
import PageFrame from '../components/pageframe.component';

class AboutPage extends BaseViewComponent {

	protected getTitle() : string{
		return 'About';
	}

	render() {
		return (
			<PageFrame center={true}>
				It's me, React!
			</PageFrame>
		);
	}

}

export default AboutPage;