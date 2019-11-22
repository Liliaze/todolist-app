import { createElement } from '../model/element.js';
import { login } from '../controller/action.js';

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

const usernameInputId = 'username_input';
const passwordInputId = 'password_input';

function createLoginForm() {
    const form = createElement('div', null, [
        createElement('div', null, [
            createElement('label', { for: 'username' }, 'Username:'),
            createElement('input', { type: 'text', name: 'username', id: usernameInputId, required: true, placeholder: 'medialis' }),
        ]),
        createElement('div', null, [
            createElement('label', { for: 'password' }, 'Password:'),
            createElement('input', { type: 'password', name: 'password', id: passwordInputId, required: true }),
        ]),
        createElement('button', { onclick: () => alert('TODO') }, 'New Account'),
        createElement('button', { onclick: handlerLoginClick }, 'Login'),
    ]);

    return form;
}

function handlerLoginClick(event) {
    const username = document.getElementById(usernameInputId);
    const password = document.getElementById(passwordInputId);

    const token = login(username, password);

    alert('You are logged in! Your token is: ' + token);
}