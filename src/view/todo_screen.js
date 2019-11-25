import { createElement } from '../model/element.js';
// import { navigateToLoginScreen } from '../controller/action.js';
import { getLocalTaskLists, getLocalTasksById} from '../controller/action.js';
import { isAlphaNumeric } from './utils.js';

var taskListSelectedId = 0;

const memory = {
    taskListDiv: createTaskLists(),
    newTaskForm: createNewTaskForm(),
    tasksDiv: createTasks(),
};

export function createTodoScreen() {
    const screen = createElement('div',
        { id: 'todo_screen' },
        [
            createElement('h1', null, 'Todo Lists App'),
            createElement('h2', null, 'tasks lists'),
            memory.taskListDiv,
            memory.newTaskForm,
            memory.tasksDiv,
        ]);

    return screen;
}

function createTaskLists() {
    const taskLists = getLocalTaskLists();
    const select = createElement('select', { className: 'formDiv', 
            onchange: () => updateTaskListSelectedId( select.value )}, [
        taskLists.map(taskList => createElement('option',
            { value: taskList['tasklist_id'],},
        taskList["title"]))
    ]);

    console.log(taskLists);

    const optionList = createElement('div', null, [
        select,
        createElement('button', {
            onclick: () => {
                alert("To do : add a list id : " + select.value);
            }
        }, 'ADD'),
        createElement('button', {
            onclick: () => {
                alert("To do : delete list id : " + select.value);
            }
        }, 'DELETE'),
        createElement('button', {
            onclick: () => {
                alert("To do : update list id : " + select.value);
            }
        }, 'UPDATE'),
    ]);
    taskListSelectedId = select.value;
    return optionList;
}

function updateTaskListSelectedId(selectValue) {
    taskListSelectedId = selectValue;
    memory.tasksDiv.replaceContent(createTasks());
}

function createTasks() {
    //TO DO call TaskQueries.Update and TaskQueries.Delete
    const tasks = getLocalTasksById(taskListSelectedId);

    const tasksElement = createElement('div', { className: 'formDiv' }, [
        createElement('ul', null, [
            tasks.map(task => createElement('li', { classname: 'task',  value: task['task_id']}, [
                task["content"],                
                createElement('button', {
                    onclick: () => {
                        alert("To do : delete task n°" + task['task_id']);
                    }
                }, 'DELETE'),
                createElement('button', {
                    onclick: () => {
                        alert("To do : update task n°" + task['task_id']);
                    }
                }, 'UPDATE'),
            ]
            ))
        ]),  
    ]);
    return tasksElement;
}

function createNewTaskForm() {
    //TO DO call TaskQueries.Add
    const contentLabel = createElement('label', { className: 'label' }, 'Title of new task :');
    const contentInput = createElement('input', { type: 'text', required: true, placeholder: 'Create my new task' });

    const form = createElement('div', { className: 'formDiv' }, [
        createElement('div', null, [contentLabel, contentInput]),
        createElement('button', {
            onclick: () => {
                if (checkValidInputValues()) {
                    //addNewTaskInDB(contentInput.value);
                    alert("To do : create new task ");
                }
            }
        }, 'ADD NEW TASK'),
    ]);
    
    const checkValidInputValues = () => {
        let isValid = true;
        
        if (contentInput.value.length < 1 ||
            contentInput.value.length > 250 ||
            !isAlphaNumeric(contentInput.value) ) {
            isValid = false;
            contentLabel.className = 'label-error';
        } else {
            contentLabel.className = 'label';
        }
    }

    return form;
}