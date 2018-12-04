import * as React from 'react';
import BaseViewComponent from '../components/base.view.component';

class AboutPage extends BaseViewComponent {

	protected getTitle() : string{
		return 'About';
	}

	render() {
		return (
			<div>
				It's me, React!
			</div>
		);
	}

}

export default AboutPage;