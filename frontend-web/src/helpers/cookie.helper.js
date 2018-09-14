import cookie from 'react-cookies';

export function getUser() {
    return cookie.load('userId');
}

export function getIsUserLogged() {
    const userName = getUser();
    return ((userName && userName !== ''));
}

export function setUser(userId) {
    cookie.save('userId', userId, { path: '/' });
}

export function removeUser() {
    cookie.remove('userId', { path: '/' });
}