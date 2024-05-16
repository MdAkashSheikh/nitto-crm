export function saveJWTToken(jwtToken) {
    window.localStorage.setItem('jwt_token', jwtToken);
}

export function saveUserName(userName) {
    window.localStorage.setItem('jwtUserName', userName);
}

export function getJWTToken() {
    return window.localStorage.getItem('jwt_token')
}

export function getUserName() {
    return window.localStorage.getItem('jwtUserName');
}

export function deleteJWTToken() {
    window.localStorage.removeItem('jwt_token')
    window.localStorage.removeItem('jwtUserName');
}