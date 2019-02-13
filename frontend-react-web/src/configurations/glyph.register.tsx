import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { 
	faPlus,
	faEdit,
	faTrashAlt,
	faExclamationCircle
	 } from '@fortawesome/free-solid-svg-icons';


/*
	Get the icon names from 
	https://fontawesome.com/icons

	faExclamationCircle = "exclamation-circle"
*/

// register all icons for futher usage
export function RegisterGlyph() {
	// default icon style
	library.add(fab)
	// icon list
	library.add(faPlus);
	library.add(faEdit);
	library.add(faTrashAlt);
	library.add(faExclamationCircle);
}
