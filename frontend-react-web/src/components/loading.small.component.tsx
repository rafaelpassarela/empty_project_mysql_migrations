import * as React from 'react';
import LoadImageSm from '../img/loading_sm.gif';
import '../inc/App.css';

/* 
  You can customize your loading gif at
  https://loading.io/animation/icon/
*/

interface ILoadingSmallProps extends React.Props<ILoadingSmallProps> {
	active: boolean,
	marginLeft?: number,
	marginRight?: number
}

class LoadingSmall extends React.Component<ILoadingSmallProps, {}> {
	static defaultProps: ILoadingSmallProps;

	render() {
		if (this.props.active) {
			let imageStyle = {
				zIndex: 1034,
				display: 'inline',
				marginLeft: this.props.marginLeft,
				marginRight: this.props.marginRight
			}
			return <img className="imgCenter" style={imageStyle} src={LoadImageSm} alt="Loading..." />
		} else {
			return <span />
		}
	}
}

LoadingSmall.defaultProps = {
	active: false,
	marginLeft: 10,
	marginRight: 10
}

export default LoadingSmall;


