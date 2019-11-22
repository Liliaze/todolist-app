import { getLocalAuthToken } from './repository/action.js';

window.addEventListener('load', main);

function main() {
    console.log('hello from main!', data);

    const authToken = getLocalAuthToken();

    if (authToken) {
        console.log(">>> authToken", authToken);
        // TODO: load tasks: if auth error -> render login screen, else -> render task screen
    } else {
        // TODO: render login screen
    }
}