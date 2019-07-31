import * as React from 'react';
import PageFrame from './pageframe.component';
import LocalizationConfig from '../configurations/localization.config';
import { RouteComponentProps } from 'react-router-dom';

export interface IBaseViewProps extends RouteComponentProps {
	needAuth?: boolean
};

abstract class BaseViewComponent<P extends IBaseViewProps, S = {}> extends React.Component<P, S>{

	componentDidMount() {
		let name = this.getPageTitle();
		if (name != '') {
			name = ' - ' + name;
		}

		document.title = LocalizationConfig.companyName + name;
	}

	protected abstract getPageTitle(): string;
	protected abstract doRender(): any;

	protected renderLeft() : any { return null; }
	protected renderRight() : any { return null; }
	protected isCenter() : boolean {
		return false;
	}
	protected hideXS(): boolean {
		return false;
	}
	protected hideSM(): boolean {
		return false;
	}

	render() {
		return (
			<div>
				<PageFrame 
					center={this.isCenter()}
					hideSM={this.hideSM()}
					hideXS={this.hideXS()}
					onRenderLeft={this.renderLeft}
					onRenderRight={this.renderRight}
				>
				{this.doRender()}
				</PageFrame>
				<div className="dummy-space hidden-print" />
			</div>
		);
	}

}

export default BaseViewComponent;