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
    const usernameLabel = createElement('label', { id: 'username_label', className: 'label' }, 'Username:');
    const usernameInput = createElement('input', { type: 'text', required: true, placeholder: 'medialis' });
    const passwordInput = createElement('input', { type: 'password', required: true });
    const passwordLabel = createElement('label', { id: 'password_label', className: 'label' }, 'Password:');

    const checkValidInputValues = () => {
        let isValid = true;
        if (usernameInput.value.length < 3) {
            isValid = false;
            usernameLabel.className = 'label-error';
        } else {
            usernameLabel.className = 'label';
        }
        if (passwordInput.value.length < 3) {
            isValid = false;
            passwordLabel.className = 'label-error';
        } else {
            passwordLabel.className = 'label';
        }
        return isValid;
    };

    const form = createElement('div', null, [
        createElement('div', null, [usernameLabel, usernameInput]),
        createElement('div', null, [passwordLabel, passwordInput]),
        createElement('button', {
            onclick: () => {
                if (checkValidInputValues()) {
                    login(usernameInput.value, passwordInput.value);
                }
            }
        }, 'New Account'),
        createElement('button', {
            onclick: () => () => {
                if (checkValidInputValues()) {
                    signup(usernameInput.value, passwordInput.value);
                }
            }
        }, 'Login'),
    ]);

    return form;
}
