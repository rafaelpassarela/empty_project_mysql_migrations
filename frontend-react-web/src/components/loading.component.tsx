import * as React from 'react';
import Alert from 'react-bootstrap/Alert';
import LoadImage from '../img/loading.gif';
import '../inc/App.css';

/* 
  You can customize your loading gif at
  https://loading.io/animation/icon/
*/

interface IAboutProps extends React.Props<IAboutProps> {
	active: boolean,
	caption?: string,
	message?: string
}

// use this setting to adjust your loader at center of the screen
const PositionOverlay = {
	top: '30%',
	left: '52.5%',
	zIndex: 1035
}

class Loading extends React.Component<IAboutProps, {}> {

	getMessageFrame = () => {
		if (this.props.message != undefined) {
			let caption = (this.props.caption != undefined) ? <Alert.Heading>{this.props.caption}</Alert.Heading> : null;
			return (
				<Alert variant="primary" style={{top: '80%'}}>
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
					<div className="divCenterEx" style={PositionOverlay}>
						<p className="pCenter">
							<img className="imgCenter" src={LoadImage} alt="Loading..." />
						</p>
						{this.getMessageFrame()}
					</div>
				</div>
			);
		}

		return <span>{img}</span>;
	}

}

export default Loading;


