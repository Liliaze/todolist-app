import { createElement } from '../model/element.js';
import { login, signup } from '../controller/action.js';

export function createLoginScreen() {
    const screen = createElement('div',
        { id: 'login_screen' },
        [
            createElement('h1', null, 'Todo Lists App'),
            createElement('h2', null, 'Login form'),
            createLoginForm(),
        ]);

    return screen;
}

function createLoginForm() {
    const form = createElement('div', null, [
        createElement('div', null, [
            createElement('label', { for: 'username' }, 'Username:'),
            createElement('input', { type: 'text', name: 'username', id: 'username_input', required: true, placeholder: 'medialis' }),
        ]),
        createElement('div', null, [
            createElement('label', { for: 'password' }, 'Password:'),
            createElement('input', { type: 'password', name: 'password', id: 'password_input', required: true }),
        ]),
        createElement('button', { onclick: handleNewAccountClick }, 'New Account'),
        createElement('button', { onclick: handleLoginClick }, 'Login'),
    ]);

    return form;
}

function handleLoginClick(event) {
    const username = document.getElementById('username_input');
    const password = document.getElementById('password_input');

    login(username, password);
}

function handleNewAccountClick(event) {
    const username = document.getElementById('username_input');
    const password = document.getElementById('password_input');

    signup(username, password);
}