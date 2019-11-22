import { createElement } from '../model/element.js';
// import { navigateToLoginScreen } from '../controller/action.js';

export function createTodoScreen() {
    const screen = createElement('div',
        { id: 'todo_screen' },
        [
            createElement('h1', null, 'Todo Lists App'),
            createElement('h2', null, 'tasks lists'),
        ]);

    return screen;
}

