import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { 
	faArrowCircleLeft,
	faEdit,
	faExclamationCircle,
	faInfoCircle,
	faPlus,
	faQuestionCircle,
	faSyncAlt,
	faTrashAlt,
	faTimesCircle,
	faUserLock
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
	library.add(faArrowCircleLeft);
	library.add(faEdit);
	library.add(faExclamationCircle);
	library.add(faInfoCircle);
	library.add(faPlus);
	library.add(faQuestionCircle);
	library.add(faSyncAlt);
	library.add(faTrashAlt);
	library.add(faTimesCircle);
	library.add(faUserLock);
}
