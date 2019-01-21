import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../inc/pageframe.css';

class PageFrame extends React.Component<{center?: boolean}, {}> {

	getClassName = () : string => {
		let res = 'shadow pfPanel';
		if (this.props.center != undefined && this.props.center === true)
			res += ' pfCenter';

		return res;
	}

	render() {
		return (<Row>
			<Col xs={12} sm={12} md={12} lg={12}>
				<Row>
					<Col xsHidden smHidden md={2} lg={2}></Col>
					<Col xs={12} sm={12} md={8} lg={8} className={this.getClassName()}>
						{this.props.children}
					</Col>
					<Col xsHidden smHidden md={2} lg={2}></Col>
				</Row>
			</Col>
		</Row>
		);
	}

}

export default PageFrame;