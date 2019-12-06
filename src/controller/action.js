import Config from '../config.js';
import LocalStorage from '../repository/local_storage.js';
import { storage } from '../repository/storage.js';
import { fetcher } from '../repository/fetcher.js';
import { AccountQueries, TaskListQueries, TaskQueries } from '../repository/api_client.js';
import { createLoginScreen, createTodoScreen, refreshTodoScreen } from '../view/index.js';
import { refreshTaskListElement, refreshTasksElement } from '../view/todo_screen.js';

const { fetchJson } = fetcher(Config.ApiBaseUrl);
const Storage = storage(LocalStorage);
console.log(Storage)

const memory = {
  rootHtmlElement: document.getElementById(Config.rootHtmlElementId),
  loginScreen: createLoginScreen(),
  todoScreen: createTodoScreen(),
};

function navigateToScreen(screen) {
  while (memory.rootHtmlElement.firstChild) {
    memory.rootHtmlElement.removeChild(memory.rootHtmlElement.firstChild);
  }
  memory.rootHtmlElement.appendChild(screen);
}

export function navigateToLoginScreen() {
  memory.loginScreen;
  navigateToScreen(memory.loginScreen);
}

export async function navigateToTodoScreen() {
  await loadAllRemoteTasks();
  refreshTodoScreen();
  navigateToScreen(memory.todoScreen);
}

export function logout() {
  Storage.clear();
  navigateToLoginScreen();
}

export function getLocalAuthToken() {
  return Storage.get('auth_token');
}

export async function login(username, password) {
  const jsonResult = await fetchJson(AccountQueries.getAuthToken(username, password));
  const authToken = jsonResult.auth_token;

  Storage.set('auth_token', authToken);
  navigateToTodoScreen();
}

export async function signup(username, password) {
  const jsonResult = await fetchJson(AccountQueries.create(username, password));
  const authToken = jsonResult.auth_token;

  Storage.set('auth_token', authToken);
  navigateToTodoScreen();
}

export async function addTaskList(title) {
  const authToken = getLocalAuthToken();

  const jsonResult = await fetchJson(TaskListQueries.create(authToken, title));

  const { value: allTaskLists } = await fetchJson(TaskListQueries.getAll(authToken));
  Storage.set('taskListCollection', allTaskLists);
  refreshTaskListElement();
}

export async function deleteTaskList(taskListId) {
  const authToken = getLocalAuthToken();

  const jsonResult = await fetchJson(TaskListQueries.delete(authToken, taskListId));

  const { value: allTaskLists } = await fetchJson(TaskListQueries.getAll(authToken));
  Storage.set('taskListCollection', allTaskLists);
  refreshTaskListElement();
}

export async function addTask(taskListId, content) {
  const authToken = getLocalAuthToken();

  const jsonResult = await fetchJson(TaskQueries.create(authToken, taskListId, content));

  await loadTasksCollection(authToken);
  refreshTasksElement();
}

export async function deleteTask(taskId) {
  const authToken = getLocalAuthToken();

  const jsonResult = await fetchJson(TaskQueries.delete(authToken, taskId));

  await loadTasksCollection(authToken);
  refreshTasksElement();
}

export async function doneTask(taskId, content, status, taskListId) {
  const authToken = getLocalAuthToken();

  if (status === "active")
    await fetchJson(TaskQueries.update(authToken, taskId, content, "done", taskListId));
  else
    await fetchJson(TaskQueries.update(authToken, taskId, content, "active", taskListId));

  await loadTasksCollection(authToken);
  refreshTasksElement();
}

export async function updateTask(taskId, content, status, taskListId) {
  const authToken = getLocalAuthToken();

  await fetchJson(TaskQueries.update(authToken, taskId, content, status, taskListId));

  await loadTasksCollection(authToken);
  refreshTasksElement();
}

export async function updateTaskList(title, taskListId) {
  const authToken = getLocalAuthToken();

  await fetchJson(TaskListQueries.update(authToken, taskListId, title));

  await loadAllRemoteTasks();
  refreshTaskListElement();
}

export async function loadAllRemoteTasks() {
  const authToken = getLocalAuthToken();

  await loadTaskListCollection(authToken);

  await loadTasksCollection(authToken);
}

export async function loadTaskListCollection(authToken) {
  const { value: allTaskLists } = await fetchJson(TaskListQueries.getAll(authToken));
  Storage.set('taskListCollection', allTaskLists);
}

export async function loadTasksCollection(authToken) {
  const allTaskLists = getLocalTaskLists();

  const allTasksResults = await Promise.all(allTaskLists.map(taskList => getAllTasksFetch(authToken, taskList)));
  Storage.set('taskCollection', allTasksResults);
}


async function getAllTasksFetch(authToken, taskList) {
  const { value: tasksResults } = await fetchJson(TaskQueries.getAll(authToken, taskList["tasklist_id"]));
  Storage.set('taskCollection_' + taskList["tasklist_id"], tasksResults);
  return tasksResults;
}

export function getLocalTaskLists() {
  const taskListsCollection = Storage.get('taskListCollection');
  return taskListsCollection || [];
}

export function getLocalTasks() {
  const taskCollection = Storage.get('taskCollection');
  return taskCollection || [];
}

export function getLocalTasksById(task_id) {
  const taskCollectionById = Storage.get('taskCollection_' + task_id);
  return taskCollectionById || [];
}
