import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

/*
	https://fontawesome.com/start
	or 
	https://github.com/FortAwesome/react-fontawesome

	Get the icon names from 
	https://fontawesome.com/icons
	Register				Use
	faExclamationCircle	exclamation-circle

	REGISTER THE ICON ON "configurations\glyph.register.tsx" FILE!!!!
*/

type GlyphiconProps = {
	glyph: IconProp,
	style?: any
}

class Glyphicon extends React.Component<GlyphiconProps, {}> {

	render() {
		return (
			<FontAwesomeIcon icon={this.props.glyph} style={this.props.style} />
		);
	}

}

export default Glyphicon;