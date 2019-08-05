import { createBrowserHistory } from 'history';

let history: any;
let unlisten: any;

export function InitHistory() {

	if (history == undefined) {
		console.log('Starting History...');
		history = createBrowserHistory();

		// Listen for changes to the current location.
		unlisten = history.listen((location: any, action: any) => {
			// location is an object like window.location
			console.log('ACT=' + action, 'LOC=' + location.pathname, 'STAT=' + location.state);
		});
	} else {
		console.log('History already created.');
	}
}

export function HistoryListner(): any {
	return unlisten;
}

export function GetHistory(): any {	
	return history;
}
