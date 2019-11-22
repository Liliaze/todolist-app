import { createElement } from '../model/element.js';

export function createLoginScreen() {
    const screen = createElement('div', { id: 'login_screen' });
    screen.addContent(createElement('h1', null, 'Login'));
    return screen;
}