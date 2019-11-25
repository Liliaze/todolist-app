import { createElement } from '../model/element.js';
// import { navigateToLoginScreen } from '../controller/action.js';
import { getLocalTaskLists, getLocalTasks} from '../controller/action.js';

export function createTodoScreen() {
    const screen = createElement('div',
        { id: 'todo_screen' },
        [
            createElement('h1', null, 'Todo Lists App'),
            createElement('h2', null, 'tasks lists'),
            createTaskLists(),
        ]);

    return screen;
}
/*
<SELECT name="nom" size="1">
<OPTION>lundi
<OPTION>mardi
<OPTION>mercredi
<OPTION>jeudi
<OPTION>vendredi
</SELECT>*/
function createTaskLists() {
    const taskLists = getLocalTaskLists();
    const select = createElement('select', null, [taskLists.map(element => createElement('option', { value: element["tasklist_id"] }, element["title"]))]);

    console.log(taskLists);

    const optionList = createElement('div', null, [
        select,
        createElement('button', {
            onclick: () => {
                alert("display list id : " + select.value);
            }
        }, 'DISPLAY'),
        createElement('button', {
            onclick: () => {
                alert("delete list id : " + select.value);
            }
        }, 'DELETE'),
        createElement('button', {
            onclick: () => {
                alert("update list id : " + select.value);
            }
        }, 'UPDATE'),
        createTasks(select.value),
    ]);
    return optionList;
}

function createTasks(selectedTaskListId) {

    const tasks = getLocalTasks(); // TO DO Refactor get LocalTasks to get tasks of one selectedList

    const tasksElement = createElement('div', null, [
        createElement('ul', null, [
            createElement('li', null, ["TASK ONE " + selectedTaskListId,
            createElement('button', {
                onclick: () => {
                    alert("add task");
                }
            }, 'ADD'),
            createElement('button', {
                onclick: () => {
                    alert("delete task");
                }
            }, 'DELETE'),
            createElement('button', {
                onclick: () => {
                    alert("update task");
                }
            }, 'UPDATE'),]),
            createElement('li', null, ["TASK TWO",
                createElement('button', {
                    onclick: () => {
                        alert("add task");
                    }
                }, 'ADD'),
                createElement('button', {
                    onclick: () => {
                        alert("delete task");
                    }
                }, 'DELETE'),
                createElement('button', {
                    onclick: () => {
                        alert("update task");
                    }
                }, 'UPDATE'),]),
        ]),
        
    ]);
    return tasksElement;
}