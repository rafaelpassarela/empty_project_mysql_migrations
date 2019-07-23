import * as React from 'react';
import BaseViewComponent from '../components/base.view.component';
import Alert from 'react-bootstrap/Alert';

import '../inc/App.css';

const ERROR_IMAGE_COUNT = 6;

class Error404Page extends BaseViewComponent<{}, { imageNumber: number }> {

	constructor(props: any) {
		super(props);

		this.handleImageClick = this.handleImageClick.bind(this);
		this.getErrorImage = this.getErrorImage.bind(this);

		this.state = {
			imageNumber: 0
		};
	}

	componentDidMount() {
		super.componentDidMount();
		this.getErrorImage(ERROR_IMAGE_COUNT);
	}

	protected getTitle(): string {
		return 'Page Not Found (404)';
	}

	getErrorImage(maxImageCount: number): number {

		let imgNum = (this.state == undefined) ? 0 : this.state.imageNumber;

		while (imgNum == (this.state == undefined ? 0 : this.state.imageNumber)) {
			// return a random number, from 0 to maxImg - 1;			
			imgNum = Math.floor(Math.random() * maxImageCount) + 1;
		}
		this.setState({ imageNumber: imgNum });

		return imgNum;
	}

	handleImageClick() {
		this.getErrorImage(ERROR_IMAGE_COUNT);
	}

	protected isCenter() : boolean {
		return true;
	}

	protected doRender() : any {

		let imgName = "/./img/404/404_" + this.state.imageNumber + ".gif";

		return (
			<div>
				<Alert variant="danger">
					Oops, an error occurred ! !
								</Alert>
				<img src={imgName} className="notFoundImage" onClick={this.handleImageClick} />
				<br />
				<small>(Image {this.state.imageNumber} of {ERROR_IMAGE_COUNT}, click image to change)</small>
				<h3>
					The server indicates an error "404 Not Found".
								</h3>
				Probably a page that really does not exist. <br/>
				<small><i>"{window.location.pathname}"</i></small>
			</div>
		);
	}

}

export default Error404Page;