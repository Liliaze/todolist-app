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


/* TODO: routes:
* 'POST' /api/user
* 'GET' /api/authToken

* 'GET' /api/taskList
* 'GET' /api/taskList/{idList}
* 'GET' /api/taskList/{taskListId}/tasks
* 'POST' /api/taskList
* 'POST' /api/taskList/{taskListId}
* 'POST' /api/taskList/{taskListId}/task
* 'POST' /api/task/{taskId}
* 'DELETE' /api/taskList/{taskListId}
* 'DELETE' /api/task/{taskId}
*/

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
