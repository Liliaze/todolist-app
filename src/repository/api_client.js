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
            authToken
        },
    }),
    getOne: (idTaskList, authToken) => ({
        path: 'taskList/' + idTaskList,
        method: 'GET',
        headers: {
            authToken
        },
    }),
    create: (authToken, title) => ({
        path: 'taskList',
        method: 'POST',
        headers: {
            authToken
        },
        body: {
            title
        }
    }),
    update: (idTaskList, authToken, title) => ({
        path: 'taskList/' + idTaskList,
        method: 'POST',
        headers: {
            authToken
        },
        body: {
            title
        }
    }),
    delete: (idTaskList, authToken) => ({
        path: 'taskList/' + idTaskList,
        method: 'DELETE',
        headers: {
            authToken
        }
    })
};

export const TaskQueries = {
    getAll: (idTaskList, authToken) => ({
        path: 'taskList/' + idTaskList + '/tasks',
        method: 'GET',
        headers: {
            authToken
        },
    }),
    create: (idTaskList, authToken, content) => ({
        path: 'taskList/' + idTaskList + '/task',
        method: 'POST',
        headers: {
            authToken
        },
        body: {
            content
        }
    }),
    update: (idTask, authToken, content, status, idTaskList) => ({
        path: 'task/' + idTask,
        method: 'POST',
        headers: {
            authToken
        },
        body: {
            content,
            status,
            idTaskList
        }
    }),
    delete: (idTask, authToken) => ({
        path: 'task/' + idTask,
        method: 'DELETE',
        headers: {
            authToken
        }
    }),
};

export async function fetchJson(query) {
    const requestInit = {
        method: query.method,
        headers: {
            ...query.headers,
            'Content-Type': 'application/json',
        },
        body: query.body ? JSON.stringify(query.body) : undefined,
    };
    const response = await fetch(Config.ApiBaseUrl + query.path, requestInit);

    if (response.ok) {
        const result = await response.json();

        return result;
    } else {
        throw new Error(response.status + ': ' + response.statusText);
    }
};
