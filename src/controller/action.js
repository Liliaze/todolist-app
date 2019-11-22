import Config from '../config.js';
import LocalStorage from '../repository/local_storage.js';
import { AccountQueries, fetchJson } from '../repository/api_client.js';
import { createLoginScreen } from '../view/login_screen.js';

const memory = {
    rootHtmlElement: document.getElementById(Config.rootHtmlElementId)
};

function initLoginScreen() {
    memory.loginScreen = createLoginScreen();
}

function navigateToScreen(screen) {
    while(memory.rootHtmlElement.firstChild) {
        memory.rootHtmlElement.removeChild(memory.rootHtmlElement.firstChild);
    }
    memory.rootHtmlElement.appendChild(screen);
}

export function navigateToLoginScreen() {
    if (!memory.loginScreen) {
        initLoginScreen();
    }
    navigateToScreen(memory.loginScreen);
}

export function getLocalAuthToken() {
    return LocalStorage.get('auth_token');
}

export async function login(username, password) {
    const jsonResult = await fetchJson(AccountQueries.getAuthToken(username, password));
    const authToken = jsonResult.auth_token;

    LocalStorage.set('auth_token', authToken);

    return authToken;
}