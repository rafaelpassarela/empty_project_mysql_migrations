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

	dummyColumn = () => {
		return (
			<Col xsHidden smHidden md={this.state.sizeSmall} lg={this.state.sizeSmall}>
			</Col>
		);
	}

	leftColumn = () => {
		return (this.props.onRenderLeft == undefined) ? this.dummyColumn() : (
			<Col
				xs={this.state.sizeDefault} sm={this.state.sizeDefault}
				md={this.state.sizeSmall} lg={this.state.sizeSmall}
			>
				<div className="pfSideFrameL shadow">
					{this.props.onRenderLeft()}
				</div>
			</Col>
		);
	}

	rightColumn = () => {
		return (this.props.onRenderRight == undefined) ? this.dummyColumn() : (
			<Col
				xs={this.state.sizeDefault} sm={this.state.sizeDefault}
				md={this.state.sizeSmall} lg={this.state.sizeSmall}
			>
				<div className="pfSideFrameR shadow">
					{this.props.onRenderRight()}
				</div>
			</Col>
		);
	}

	getClassName = (): string => {
		let res = 'shadow pfPanel';
		if (this.props.center != undefined && this.props.center === true)
			res += ' pfCenter';
		return res;
	}

	render() {
		return (
			<Row>
				<Col
					xs={this.state.sizeDefault} sm={this.state.sizeDefault}
					md={this.state.sizeDefault} lg={this.state.sizeDefault}>
					<Row>

						{this.leftColumn()}

						<Col className={this.getClassName()}
							xs={this.state.sizeDefault} sm={this.state.sizeDefault}
							md={this.state.sizeCenter} lg={this.state.sizeCenter}
						>
							{this.props.children}
						</Col>

						{this.rightColumn()}
					</Row>
				</Col>
			</Row>
		);
	}

}

export default PageFrame;