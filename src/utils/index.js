export function getRole(token) {
    const strings = token.replace(/"/g,'').split('.');
    const sub = JSON.parse(atob(strings[1])).sub;
    return sub.toString().split('$')[1];
}

export function getAccount(token) {
    const strings = token.replace(/"/g,'').split('.');
    const sub = JSON.parse(atob(strings[1])).sub;
    return sub.toString().split('$')[0].replace("user:",'');
}
export function getURL() {
    return 'http://localhost:8080/';
}