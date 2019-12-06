import { createElement } from '../model/element.js';
import { login, signup } from '../controller/action.js';
import { isAlphaNumeric } from './utils.js';

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
  const usernameLabel = createElement('label', { className: 'label' }, 'Username:');
  const usernameInput = createElement('input', { type: 'text', required: true, placeholder: 'medialis' });
  const passwordLabel = createElement('label', { className: 'label' }, 'Password:');
  const passwordInput = createElement('input', { type: 'password', required: true });

  const form = createElement('div', null, [
    createElement('div', null, [usernameLabel, usernameInput]),
    createElement('div', null, [passwordLabel, passwordInput]),
    createElement('div', { id: 'connectionButton' }, [
      createElement('button', {
        onclick: () => {
          if (checkValidInputValues()) {
            signup(usernameInput.value, passwordInput.value);
          }
        }
      }, 'New Account'),
      createElement('button', self => ({
        onclick: () => {
          console.log({ self });
          if (checkValidInputValues()) {
            login(usernameInput.value, passwordInput.value);
          }
        }
      }), 'Login'),])
  ]);



  const checkValidInputValues = () => {
    let isValid = true;
    if (usernameInput.value.length < 2 ||
      usernameInput.value.length > 30 ||
      !isAlphaNumeric(usernameInput.value)) {
      isValid = false;
      usernameLabel.className = 'label-error';
    } else {
      usernameLabel.className = 'label';
    }
    if (passwordInput.value.length < 6 ||
      passwordInput.value.length > 30) {
      isValid = false;
      passwordLabel.className = 'label-error';
    } else {
      passwordLabel.className = 'label';
    }
    return isValid;
  };

  return form;
}
