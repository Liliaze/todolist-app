import { getLocalAuthToken, navigateToLoginScreen, navigateToTodoScreen, loadAllRemoteTasks } from './controller/action.js';

window.addEventListener('load', main);

async function main() {
    const authToken = getLocalAuthToken();

    if (authToken) {
        console.log(">>> authToken", authToken);
        try {
            await loadAllRemoteTasks();
            navigateToTodoScreen();
        } catch (error) {
            if (!error.response || error.response.status !== 401) {
                console.error(error);
            }
            navigateToLoginScreen();
        }
    } else {
        navigateToLoginScreen();
    }
}
