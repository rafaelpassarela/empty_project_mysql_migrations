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

class PageFrame extends React.Component<PageFrameProps, {}> {

	doOnRender = (side: string) => {
		if (side == 'left') {
			if (this.props.onRenderLeft != undefined) return this.props.onRenderLeft();
		} else if (side == 'right') {
			if (this.props.onRenderRight != undefined) return this.props.onRenderRight();
		} else
			console.error('Render Sides Erros: Invalid side = [' + side + ']');

		return null;
	}

	leftColumn = () => {
		return (
			<Col xsHidden smHidden md={2} lg={2}>
				{this.doOnRender('left')}
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
				<Col xs={12} sm={12} md={12} lg={12}>
					<Row>
						{this.leftColumn()}
						<Col xs={12} sm={12} md={8} lg={8} className={this.getClassName()}>
							{this.props.children}
						</Col>
						<Col xsHidden smHidden md={2} lg={2}>
							{this.doOnRender('right')}
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}

}

export default PageFrame;