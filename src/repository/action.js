import * as LocalStorage from './local_storage.js';
import { AccountQueries, fetchJson } from './api_client.js';

export function loadLocalAuthToken() {
    return LocalStorage.get('auth_token');
}

export async function login(username, password) {
    const jsonResult = await fetchJson(AccountQueries.getAuthToken(username, password));
    const authToken = jsonResult.auth_token;

    LocalStorage.set('auth_token', authToken);

    return authToken;
}