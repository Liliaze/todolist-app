import { createElement } from '../model/element.js';
// import { navigateToLoginScreen } from '../controller/action.js';
import { getLocalTaskLists, getLocalTasks} from '../controller/action.js';

var taskListSelectedId = 0;

export function createTodoScreen() {
    const screen = createElement('div',
        { id: 'todo_screen' },
        [
            createElement('h1', null, 'Todo Lists App'),
            createElement('h2', null, 'tasks lists'),
            createTaskLists(),
            createTasks(),
        ]);

    return screen;
}

function createTaskLists() {
    const taskLists = getLocalTaskLists();
    const select = createElement('select', null, [
        taskLists.map(taskList => createElement('option',
        { value: taskList['tasklist_id'], onchange: 'updateTaskListSelectedId(select.value);', onfocus: 'updateTaskListSelectedId(select.value);' },
        taskList["title"]))]);

    console.log(taskLists);

    const optionList = createElement('div', null, [
        select,
        createElement('button', {
            onclick: () => {
                alert("add a list id : " + select.value);
            }
        }, 'ADD'),
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
    ]);
    taskListSelectedId = select.value;
    return optionList;
}

function updateSelectedTaskListId() {
    taskListSelectedId = select.value;
    alert("update taskLists");
}

function createTasks() {

    const tasks = [{"task_id":12,"user_id":27,"tasklist_id":32,"content":"finish front todolist4","status":"active","created":"2019-11-22 16:31:40","updated":"2019-11-22 16:31:40"},
    {"task_id":12,"user_id":27,"tasklist_id":32,"content":"finish front todolist4","status":"active","created":"2019-11-22 16:31:40","updated":"2019-11-22 16:31:40"}];
    //getLocalTasks(); // TO DO Refactor get LocalTasks to get tasks of one selectedList

    const tasksElement = createElement('div', null, [
        createElement('ul', null, [
            tasks.map(task => createElement('li', null, [
                task["content"],
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
                }, 'UPDATE'),
            ]
            ))
        ]),  
    ]);
    return tasksElement;
}