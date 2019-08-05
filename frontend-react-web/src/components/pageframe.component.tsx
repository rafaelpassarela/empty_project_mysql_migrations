import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../inc/pageframe.css';

export type PageFrameOnRenderSides = () => any;

type PageFrameProps = {
	center?: boolean,
	hideXS?: boolean,
	hideSM?: boolean,
	classNameOverride?: string;
	onRenderLeft?: PageFrameOnRenderSides,
	onRenderRight?: PageFrameOnRenderSides
};

type PageFrameState = {
	sizeDefault: number,
	sizeCenter: number,
	sizeSmall: number
}

class PageFrame extends React.Component<PageFrameProps, PageFrameState> {

	constructor(props: any) {
		super(props);

		this.state = {
			sizeDefault: 12,
			sizeCenter: 8,
			sizeSmall: 2
		};
	}

	leftColumn = () => {
		let val = null;
		if (this.props.onRenderLeft != undefined) {
			val = this.props.onRenderLeft(); 
		}

		if (val != null && val != undefined) {
			return (
				<div className="pf-side-left pf-side app-shadow">
					{val}
				</div>
			);
		} 

		return null;
	}

	rightColumn = () => {
		let val = null;
		if (this.props.onRenderRight != undefined) {
			val = this.props.onRenderRight();
		}

		if (val != null && val != undefined) {
			return (
				<div className="pf-side-right pf-side app-shadow">
					{val}
				</div>
			);
		}

		return null;
	}

	getMainClassName = (): string => {
		let res = 'app-shadow pf-panel';

		if (this.props.classNameOverride != undefined) {
			res = this.props.classNameOverride
		}

		if (this.props.center != undefined && this.props.center === true)
			res += ' pf-center';
		return res;
	}

	render() {
		return (

			<Row>
				<Col xs={this.state.sizeDefault} sm={this.state.sizeDefault} md={this.state.sizeDefault} lg={this.state.sizeSmall}>
					{this.leftColumn()}
				</Col>
				<Col xs={this.state.sizeDefault} sm={this.state.sizeDefault} md={this.state.sizeDefault} lg={this.state.sizeCenter} className={this.getMainClassName()}>
					{this.props.children}
				</Col>
				<Col xs={this.state.sizeDefault} sm={this.state.sizeDefault} md={this.state.sizeDefault} lg={this.state.sizeSmall}>
					{this.rightColumn()}
				</Col>
			</Row>

		);
	}

}

export default PageFrame;