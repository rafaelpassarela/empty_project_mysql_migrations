import * as React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import BaseViewComponent, { IBaseViewProps } from '../components/base.view.component';
import Glyphicon from '../components/glyphicon.component';

import '../inc/App.css';

const ERROR_IMAGE_COUNT = 6;

class Error404Page<P extends IBaseViewProps, S = {}> 
	extends BaseViewComponent<P, { imageNumber: number; imgList: Array<any> }> {

	constructor(props: any) {
		super(props);

		this.handleImageClick = this.handleImageClick.bind(this);
		this.getErrorImage = this.getErrorImage.bind(this);

		let list : Array<any> = new Array<any>(ERROR_IMAGE_COUNT);
		for (let i = 1; i <= ERROR_IMAGE_COUNT; i++ ) {
			list[i-1] = require('../img/404/404_' + i + '.gif');
		}

		this.state = {
			imageNumber: 0,
			imgList: list
		};
	}

	componentDidMount() {
		super.componentDidMount();
		this.getErrorImage(ERROR_IMAGE_COUNT);
	}

	protected getPageTitle(): string {
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

		let imgName = this.state.imgList[this.state.imageNumber-1];

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
				<div style={{marginTop: 20}}>
					<Button size="lg" variant="outline-warning" onClick={ () => this.props.history.goBack() }>
						<Glyphicon glyph="arrow-circle-left" />
					</Button>
				</div>
			</div>
		);
	}

}

export default Error404Page;