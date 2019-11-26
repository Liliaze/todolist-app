import Config from '../config.js';
import LocalStorage from '../repository/local_storage.js';
import { fetcher } from '../repository/fetcher.js';
import { AccountQueries, TaskListQueries, TaskQueries } from '../repository/api_client.js';
import { createLoginScreen, createTodoScreen } from '../view/index.js';

const { fetchJson } = fetcher(Config.ApiBaseUrl);

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
  navigateToScreen(memory.loginScreen);
}

export function navigateToTodoScreen() {
  navigateToScreen(memory.todoScreen);
}

export function getLocalAuthToken() {
  return LocalStorage.get('auth_token');
}

export async function login(username, password) {
  const jsonResult = await fetchJson(AccountQueries.getAuthToken(username, password));
  const authToken = jsonResult.auth_token;

  LocalStorage.set('auth_token', authToken);
  await loadAllRemoteTasks();
  navigateToTodoScreen();
}

export async function signup(username, password) {
  const jsonResult = await fetchJson(AccountQueries.create(username, password));
  const authToken = jsonResult.auth_token;

  LocalStorage.set('auth_token', authToken);
  await loadAllRemoteTasks();
  navigateToTodoScreen();
}

export async function loadAllRemoteTasks() {
  const authToken = getLocalAuthToken();

  const { value: allTaskLists } = await fetchJson(TaskListQueries.getAll(authToken));
  LocalStorage.set('taskListCollection', allTaskLists);

  const allTasksResults = await Promise.all(allTaskLists.map(taskList => getAllTasksFetch(authToken, taskList)));
  LocalStorage.set('taskCollection', allTasksResults);
}

async function getAllTasksFetch(authToken, taskList) {
  const { value: tasksResults } = await fetchJson(TaskQueries.getAll(authToken, taskList["tasklist_id"]));
  LocalStorage.set('taskCollection_' + taskList["tasklist_id"], tasksResults);
  return tasksResults;
}
export function getLocalTaskLists() {
  const taskListsCollection = LocalStorage.get('taskListCollection');
  return taskListsCollection || [];
}

export function getLocalTasks() {
  const taskCollection = LocalStorage.get('taskCollection');
  return taskCollection || [];
}

export function getLocalTasksById(task_id) {
  const taskCollectionById = LocalStorage.get('taskCollection_' + task_id);
  return taskCollectionById || [];
}
