import * as React from 'react';
import LoadImage from '../img/loading.gif';
import '../inc/App.css';

/* 
  You can customize your loading gif at
  https://loading.io/animation/icon/
*/

// use this setting to adjust your loader at center of the screen
const PositionOverlay = {
	top: '30%',
	left: '47%'
}

class Loading extends React.Component<{ active: boolean }, {}> {

	render() {

		let img = null;
		if (this.props.active) {
			img = (
				<div className="divCenterEx" style={PositionOverlay}>
					<p className="pCenter">
						<img className="imgCenter" src={LoadImage} alt="Loading..." />
					</p>
				</div>
			);
		}

		return <span>{img}</span>;
	}

}

export default Loading;


