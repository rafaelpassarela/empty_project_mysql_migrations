import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../inc/pageframe.css';

export type PageFrameOnRenderSides = () => any;

type PageFrameProps = {
	center?: boolean,
	hideXS?: boolean,
	hideSM?: boolean,
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
		return (this.props.onRenderLeft == undefined) ? null : (
			<div className="pf-side-left pf-side app-shadow">
				{this.props.onRenderLeft()}
			</div>
		);
	}

	rightColumn = () => {
		return (this.props.onRenderRight == undefined) ? null : (
			<div className="pf-side-right pf-side app-shadow">
				{this.props.onRenderRight()}
			</div>
		);
	}

	getMainClassName = (): string => {
		let res = 'app-shadow pf-panel';
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