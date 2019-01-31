import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
  https://fontawesome.com/start
  or 
  https://github.com/FortAwesome/react-fontawesome

  Get the icon names from 
  https://fontawesome.com/icons
  Register				Use
  faExclamationCircle	exclamation-circle

  REGISTER THE ICON ON "glyph.register.tsx" FILE!!!!
*/

type GlyphiconProps = {
	glyph: string,
	style?: any
}

class Glyphicon extends React.Component<GlyphiconProps, {}> {

	render() {
        // <FontAwesomeIcon icon="coffee" />	
        // <i className="material-icons" style={this.props.style}>{this.props.glyph}</i>
		return (
			<FontAwesomeIcon icon="coffee" style={this.props.style} />
		);
	}

}

export default Glyphicon;