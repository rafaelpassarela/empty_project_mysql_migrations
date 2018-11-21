import Cookies from 'universal-cookie';

const cookie = new Cookies();

export function set(name:string, value:any) {
	cookie.set(name, value, { path: '/' });
}

export function get(name:string) {
	return cookie.get(name);
}

export function remove(name:string){
	cookie.remove(name, { path: '/' });	
}

export function setUser(userId:any) {
	set('userId', userId);
}

export function getUser() {
    return get('userId');
}

export function getIsUserLogged() {
    const userName = getUser();
    return ((userName && userName !== ''));
}

export function removeUser() {
	remove('userId');    
}