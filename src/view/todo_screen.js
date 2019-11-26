import { createElement } from '../model/element.js';
// import { navigateToLoginScreen } from '../controller/action.js';
import { getLocalTaskLists, getLocalTasksById, logout } from '../controller/action.js';
import { isAlphaNumeric } from './utils.js';

var taskListSelectedId = 0;

const memory = {
  logoutButton: null,
  newTaskListForm: null,
  taskListDiv: null,
  newTaskForm: null,
  tasksDiv: null,
};

export function createTodoScreen() {

  const screen = createElement('div',
    { id: 'todo_screen' },
    [
      createElement('h1', null, 'Todo Lists App'),
      memory.logoutButton = createLogoutButton(),
      createElement('h2', null, 'Choose your list :'),
      memory.taskListDiv = createTaskLists(),
      memory.newTaskListForm = createNewTaskListForm(),
      createElement('h2', null, 'Follow and update your tasks :'),
      memory.newTaskForm = createNewTaskForm(),
      memory.tasksDiv = createTasks(),
    ]);
  return screen;
}

function createLogoutButton() {
  const logoutButton = createElement('div', null, [
    createElement('button', {
      id: "logoutButton",
      onclick: () => {
        logout();
      }
    }, 'LOGOUT'),
  ])
  return logoutButton;
}

function createTaskLists() {
  const taskLists = getLocalTaskLists();
  if (!taskLists.length) {
    return;
  }
  const select = createElement('select', {
    className: 'formDiv',
    onchange: () => updateTaskListSelectedId(select.value)
  }, [
    taskLists.map(taskList => createElement('option',
      { value: taskList['tasklist_id'], },
      taskList["title"]))
  ]);

  const optionList = createElement('div', null, [
    select,
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

  if (!tasks.length) {
    return;
  }
  const tasksElement = createElement('div', { className: 'formDiv' }, [
    createElement('ul', null, [
      tasks.map(task => createElement('li', { className: 'task', value: task['task_id'] }, [
        task["content"],
        createElement('button', {
          className: 'deleteTaskButton',
          onclick: () => {
            alert("To do : delete task n°" + task['task_id']);
          }
        }, 'DELETE'),
        createElement('button', {
          className: 'updateTaskButton',
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
  const contentInput = createElement('input', { type: 'text', required: true, placeholder: 'Create my new task' });

  const form = createElement('div', { className: 'formDiv' }, [
    createElement('div', null, [contentInput,
      createElement('button', {
        onclick: () => {
          if (checkValidInputValues()) {
            //addNewTaskInDB(contentInput.value);
            alert("To do : create new task ");
          }
        }
      }, 'ADD NEW TASK'),])
  ]);

  return form;
}

function createNewTaskListForm() {
  //TO DO call TaskQueries.Add
  const contentInput = createElement('input', { type: 'text', required: true, placeholder: 'Create my new list' });

  const form = createElement('div', { className: 'formDiv' }, [
    createElement('div', null, [contentInput,
      createElement('button', {
        onclick: () => {
          if (checkValidInputValues()) {
            //addNewTaskListInDB(contentInput.value);
            alert("To do : create new list ");
          }
        }
      }, 'ADD NEW LIST'),])
  ]);

  return form;
}
