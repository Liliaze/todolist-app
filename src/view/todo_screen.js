import { createElement } from '../model/element.js';
// import { navigateToLoginScreen } from '../controller/action.js';
import { getLocalTaskLists, getLocalTasksById, logout } from '../controller/action.js';
import { isAlphaNumeric } from './utils.js';

var taskListSelectedId = 0;

const memory = {
  logoutButton: createLogoutButton(),
  newTaskListForm: createTaskLists(),
  taskListDiv: createNewTaskListForm(),
  newTaskForm: createNewTaskForm(),
  tasksDiv: createTasks(),
};

export function refreshTodoScreen() {
  memory.logoutButton = createLogoutButton();
  memory.taskListDiv = createTaskLists();
  memory.newTaskListForm = createNewTaskListForm();
  memory.newTaskForm = createNewTaskForm();
  memory.tasksDiv = createTasks();
  return createTodoScreen();
}

export function createTodoScreen() {

  const screen = createElement('div',
    { id: 'todo_screen' },
    [
      createElement('h1', null, 'Todo Lists App'),
      memory.logoutButton,
      createElement('h2', null, 'Choose your list :'),
      memory.taskListDiv,
      memory.newTaskListForm,
      createElement('h2', null, 'Follow and update your tasks :'),
      memory.newTaskForm,
      memory.tasksDiv,
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
    onchange: () => {
      taskListSelectedId = selectValue;
      memory.tasksDiv.replaceContent(createTasks());
    }
  }, [
    taskLists.map(taskList => createElement('option',
      { value: taskList['tasklist_id'], },
      taskList["title"]))
  ]);

  const optionList = createElement('div', null, [
    select,
    createElement('button', {
      onclick: () => {
        //handlerDeleteTaskList(select.value);
      }
    }, 'DELETE'),
    createElement('button', {
      onclick: () => {
        //handlerUpdateTaskList(select.value);
      }
    }, 'UPDATE'),
  ]);
  taskListSelectedId = select.value;
  return optionList;
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
