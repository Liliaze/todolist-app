import { createElement } from '../model/element.js';
import * as Action from '../controller/action.js';
import { isAlphaNumeric } from './utils.js';

var taskListSelectedId = 0;

const memory = {
  logoutButton: createLogoutButton(),
  taskListDiv: createTaskLists(),
  newTaskForm: createNewTaskForm(),
  tasksDiv: createTasks(),
};

export function refreshTodoScreen() {
  memory.logoutButton.replaceContent(createLogoutButton());
  memory.taskListDiv.replaceContent(createTaskLists());
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
        Action.logout();
      }
    }, 'LOGOUT'),
  ])
  return logoutButton;
}

function createTaskLists() {
  const taskLists = Action.getLocalTaskLists();
  if (!taskLists.length) {
    return createNewTaskListForm();
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
        Action.deleteTaskList(select.value);
      }
    }, createElement('i', { className: "fas fa-trash" })),
    createElement('button', {
      onclick: () => {
        var newTitle = prompt("Please enter your new name for this taskList", "");
        if (newTitle !== null && newTitle !== "") {
          if (isAlphaNumeric(newTitle) && newTitle.length < 250)
            Action.updateTaskList(newTitle, taskListSelectedId);
          else
            prompt("Please enter valid new title", "");
        }
      }
    }, createElement('i', { className: "fas fa-pencil-alt" })),
    createElement('button', {
      onclick: () => {
        var newTitle = prompt("Please enter a name for new taskList", "Create a new taskList");
        if (newTitle !== null && newTitle !== "") {
          if (isAlphaNumeric(newTitle) && newTitle.length < 250)
            Action.addTaskList(newTitle);
          else
            alert("Please enter only alphanumeric data");
        }
      }
    }, createElement('i', { className: "fas fa-plus" })),
  ]);
  taskListSelectedId = select.value;
  return optionList;
}


function createTasks() {
  const tasks = Action.getLocalTasksById(taskListSelectedId);

  if (!tasks.length) {
    return createElement('div', null, []);
  }
  const tasksElement = createElement('div', { className: 'formDiv' }, [
    createElement('ul', null, [
      tasks.map(task => createElement('li', { className: 'task' + task['status'], value: task['task_id'] }, [
        createElement('button', {
          className: 'doneTaskButton',
          onclick: () => {
            Action.doneTask(task['task_id'], task['content'], task['status'], task['tasklist_id']);
          }
        }, createElement('p', null, task["content"])),
        createElement('button', {
          className: 'deleteTaskButton',
          onclick: () => {
            Action.deleteTask(task['task_id']);
          }
        }, createElement('i', { className: "fas fa-trash" })),
        createElement('button', {
          className: 'updateTaskButton',
          onclick: () => {
            var newContent = prompt("Please enter your new task", task['content']);
            if (newContent !== null && newContent !== "") {
              if (isAlphaNumeric(newContent) && newContent.length < 250)
                Action.updateTask(task['task_id'], newContent, task['status'], task['tasklist_id']);
              else
                prompt("Please enter valid new task", "");
            }
          }
        }, createElement('i', { className: "fas fa-pencil-alt" })),
      ]
      ))
    ]),
  ]);
  return tasksElement;
}

function createNewTaskForm() {
  const contentInput = createElement('input', { type: 'text', required: true, placeholder: 'Create my new task' });

  const form = createElement('div', { className: 'formDiv' }, [
    createElement('div', null, [contentInput,
      createElement('button', {
        onclick: () => {
          if (isAlphaNumeric(contentInput.value) && contentInput.value.length < 250)
            Action.addTask(taskListSelectedId, contentInput.value);
          else
            alert("Please enter only alphanumeric data");
        }
      }, createElement('i', { className: "fas fa-plus" })),])
  ]);

  return form;
}

function createNewTaskListForm() {
  const contentInput = createElement('input', { type: 'text', required: true, placeholder: 'Create my new list' });

  const form = createElement('div', { className: 'formDiv' }, [
    createElement('div', null, [contentInput,
      createElement('button', {
        onclick: () => {
          if (isAlphaNumeric(contentInput.value) && contentInput.value.length < 250)
            Action.addTaskList(contentInput.value);
          else
            alert("Please enter only alphanumeric data");
        }
      }, createElement('i', { className: "fas fa-plus" })),])
  ]);

  return form;
}
