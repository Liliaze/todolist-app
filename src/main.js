import { getLocalAuthToken, navigateToLoginScreen } from './controller/action.js';

window.addEventListener('load', main);

function main() {
    console.log('hello from main!');

    const authToken = getLocalAuthToken();

    if (authToken) {
        console.log(">>> authToken", authToken);
        // TODO: load tasks: if auth error -> render login screen, else -> render task screen
    } else {
        navigateToLoginScreen();
    }
}
