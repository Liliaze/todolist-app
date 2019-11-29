import { createElement } from '../model/element.js';
// import { navigateToLoginScreen } from '../controller/action.js';
import { getLocalTaskLists, getLocalTasksById, logout, addTaskList, deleteTaskList, updateTaskList, addTask, deleteTask, doneTask, updateTask } from '../controller/action.js';
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
  memory.logoutButton.replaceContent(createLogoutButton());
  memory.taskListDiv.replaceContent(createTaskLists());
  memory.newTaskListForm.replaceContent(createNewTaskListForm());
  memory.newTaskForm.replaceContent(createNewTaskForm());
  memory.tasksDiv.replaceContent(createTasks());
}

export function refreshTaskListElement() {
  memory.taskListDiv.replaceContent(createTaskLists());
  refreshTasksElement();
}

export function refreshTasksElement() {
  memory.tasksDiv.replaceContent(createTasks());
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
    return createElement('div', null, []);
  }

  const select = createElement('select', {
    className: 'formDiv',
    onchange: () => {
      taskListSelectedId = select.value;
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
        deleteTaskList(select.value);
      }
    }, createElement('i', { className: "fas fa-trash" })),
    createElement('button', {
      onclick: () => {

        var newTitle = prompt("Please enter your new name for this taskList", "");
        if (newTitle !== null && newTitle !== "") {
          updateTaskList(newTitle, taskListSelectedId);
        }
      }
    }, createElement('i', { className: "fas fa-pencil-alt" })),
  ]);
  taskListSelectedId = select.value;
  return optionList;
}


function createTasks() {
  //TO DO call TaskQueries.Update and TaskQueries.Delete
  const tasks = getLocalTasksById(taskListSelectedId);

  if (!tasks.length) {
    return createElement('div', null, []);
  }
  const tasksElement = createElement('div', { className: 'formDiv' }, [
    createElement('ul', null, [
      tasks.map(task => createElement('li', { className: 'task' + task['status'], value: task['task_id'] }, [
        createElement('button', {
          className: 'deleteTaskButton',
          onclick: () => {
            deleteTask(task['task_id']);
          }
        }, createElement('i', { className: "fas fa-trash" })),
        createElement('button', {
          className: 'updateTaskButton',
          onclick: () => {
            var newContent = prompt("Please enter your new task", task['content']);
            if (newContent !== null && newContent !== "") {
              updateTask(task['task_id'], newContent, task['status'], task['tasklist_id']);
            }
          }
        }, createElement('i', { className: "fas fa-pencil-alt" })),
        createElement('button', {
          className: 'doneTaskButton',
          onclick: () => {
            doneTask(task['task_id'], task['content'], task['status'], task['tasklist_id']);
          }
        }, createElement('p', null, task["content"])),
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
          addTask(taskListSelectedId, contentInput.value);
        }
      }, createElement('i', { className: "fas fa-plus" })),])
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
          addTaskList(contentInput.value);
        }
      }, createElement('i', { className: "fas fa-plus" })),])
  ]);

  return form;
}
