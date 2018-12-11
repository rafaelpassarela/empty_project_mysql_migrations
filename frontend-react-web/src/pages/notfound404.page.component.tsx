import * as React from 'react';
import BaseViewComponent from '../components/base.view.component';
import { Row, Col, Alert } from 'react-bootstrap';

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

	render() {

		let imgName = "./img/404/404_" + this.state.imageNumber + ".gif";

		return (
			<div>
				<Row>
					<Col xs={12} sm={12} md={12} lg={12}>
						<Row>
							<Col xsHidden smHidden md={3} lg={3}></Col>
							<Col xs={12} sm={12} md={6} lg={6} className="shadow notFoundPanel">
								<Alert bsStyle="danger">
									Oops, an error occurred ! !
								</Alert>
								<img src={imgName} className="notFoundImage" onClick={this.handleImageClick} />
								<br />
								<small>(Image {this.state.imageNumber} of {ERROR_IMAGE_COUNT}, click image to change)</small>
								<h3>
									The server indicates an error "404 Not Found".
								</h3>
								Probably a page that really does not exist.
							</Col>
							<Col xsHidden smHidden md={3} lg={3}></Col>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}

}

export default Error404Page;