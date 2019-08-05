import * as React from 'react';
import Alert from 'react-bootstrap/Alert';
import LoadImage from '../img/loading.gif';
import '../inc/App.css';
import '../inc/loading.css';

/* 
  You can customize your loading gif at
  https://loading.io/animation/icon/
*/

interface ILoadingProps extends React.Props<ILoadingProps> {
	active: boolean,
	caption?: string,
	message?: string,
	variant?:
	| 'primary'
	| 'secondary'
	| 'success'
	| 'danger'
	| 'warning'
	| 'info'
	| 'dark'
	| 'light';
}

class Loading extends React.Component<ILoadingProps, {}> {
	static defaultProps: ILoadingProps;

	getMessageFrame = () => {
		if (this.props.message != undefined) {
			let caption = (this.props.caption != undefined) ? <Alert.Heading>{this.props.caption}</Alert.Heading> : null;
			return (
				<Alert variant={this.props.variant}>
					{caption}
					{this.props.message}
				</Alert>
			);
		}
		return null
	}

	render() {

		let img = null;
		if (this.props.active) {
			img = (
				<div>
					<div className="screen-backdrop"></div>
					<div className="exactCenter load-img-overlay">
						<p className="pCenter">
							<img className="imgCenter" src={LoadImage} alt="Loading..." />
						</p>						
					</div>
					<div className="exactCenter load-message-overlay">
						{this.getMessageFrame()}
					</div>
				</div>
			);
		}

		return <span>{img}</span>;
	}

}

Loading.defaultProps = {
	active: false,
	variant: 'primary'
}

export default Loading;


