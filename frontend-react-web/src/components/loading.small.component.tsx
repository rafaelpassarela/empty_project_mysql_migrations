import * as React from 'react';
import LoadImageSm from '../img/loading_sm.gif';
import '../inc/App.css';

/* 
  You can customize your loading gif at
  https://loading.io/animation/icon/
*/

interface ILoadingSmallProps extends React.Props<ILoadingSmallProps> {
	active: boolean
}

// use this setting to adjust your loader at center of the screen
const PositionOverlay = {
	//top: '30%',
	//left: '52.5%',
	zIndex: 1035
}

class LoadingSmall extends React.Component<ILoadingSmallProps, {}> {
	static defaultProps: ILoadingSmallProps;

	render() {

		let img = null;
		if (this.props.active) {
			img = (
				<div style={PositionOverlay}>
					<img className="imgCenter" src={LoadImageSm} alt="Loading..." />
				</div>
			);
		}

		return <span>{img}</span>;
	}

}

LoadingSmall.defaultProps = {
	active: false
}

export default LoadingSmall;


