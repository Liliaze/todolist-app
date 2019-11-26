import Config from '../config.js';

export const AccountQueries = {
  create: (username, password) => ({
    path: 'user',
    method: 'POST',
    body: {
      username,
      password
    },
  }),
  getAuthToken: (username, password) => ({
    path: 'authToken',
    method: 'GET',
    headers: {
      username,
      password
    },
  })
};

export const TaskListQueries = {
  getAll: (authToken) => ({
    path: 'taskList',
    method: 'GET',
    headers: {
      auth_token: authToken
    },
  }),
  getOne: (authToken, taskListId) => ({
    path: 'taskList/' + taskListId,
    method: 'GET',
    headers: {
      auth_token: authToken
    },
  }),
  create: (authToken, title) => ({
    path: 'taskList',
    method: 'POST',
    headers: {
      auth_token: authToken
    },
    body: {
      title
    }
  }),
  update: (authToken, taskListId, title) => ({
    path: 'taskList/' + taskListId,
    method: 'POST',
    headers: {
      auth_token: authToken
    },
    body: {
      title
    }
  }),
  delete: (authToken, taskListId) => ({
    path: 'taskList/' + taskListId,
    method: 'DELETE',
    headers: {
      auth_token: authToken
    }
  })
};

export const TaskQueries = {
  getAll: (authToken, taskListId) => ({
    path: 'taskList/' + taskListId + '/tasks',
    method: 'GET',
    headers: {
      auth_token: authToken
    },
  }),
  create: (authToken, taskListId, content) => ({
    path: 'taskList/' + taskListId + '/task',
    method: 'POST',
    headers: {
      auth_token: authToken
    },
    body: {
      content
    }
  }),
  update: (authToken, taskId, content, status, taskListId) => ({
    path: 'task/' + taskId,
    method: 'POST',
    headers: {
      auth_token: authToken
    },
    body: {
      content,
      status,
      id_tasklist: taskListId
    }
  }),
  delete: (authToken, taskId) => ({
    path: 'task/' + taskId,
    method: 'DELETE',
    headers: {
      auth_token: authToken
    }
  }),
};


