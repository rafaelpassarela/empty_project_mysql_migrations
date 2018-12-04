import * as React from 'react';
import BaseViewComponent from '../components/base.view.component';
import { Row, Col } from 'react-bootstrap';

class Error404Page extends BaseViewComponent {

	protected getTitle(): string {
		return 'Page Not Found (404)';
	}

	render() {
		return (
			<div>
				<Row>
					<Col xs={12} sm={12} md={12} lg={12}>
						TESTE<br />
						TESTE<br />
						TESTE<br />
						TESTE<br />
						TESTE<br />
						TESTE<br />
						TESTE<br />
					</Col>
				</Row>
			</div>
		);
	}

}

// IMG HERE = <img src="{{imageName}}" style="border-radius: 50%; padding: 5px; border:3px solid #337ab7;" />

// <div className="col-md-12">
// 	<div className="col-md-3"></div>
// 	<div className="col-md-6">
// 		<div className="panel panel-primary">
// 			<div className="panel-body">
// 				<div className="alert alert-danger" role="alert">
// 					<h3>MENS HEADER</h3>
// 				</div>
// 				IMG HERE
// 				<h2>Mens 02</h2>
// 				Mens 03
//         </div>
// 		</div>
// 	</div>
// 	<div className="col-md-3"></div>
// </div>

// <div className="col-md-3"></div>

// <div className="col-md-6 text-center">
// 	<div className="btn-group">
// 		BTN VOLTAR -> <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
// 	</div>
// </div>

// <div className="col-md-3"></div>

export default Error404Page;