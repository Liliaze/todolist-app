import { getLocalAuthToken, navigateToLoginScreen, navigateToTodoScreen, loadAllRemoteTasks } from './controller/action.js';
import { setupErrorHandler } from './controller/errorHandler.js';

window.addEventListener('load', main);

function main() {
  setupErrorHandler(error => alert(error.message)); // TODO: to improve

  const authToken = getLocalAuthToken();

  if (authToken) {
    try {
      navigateToTodoScreen();
    } catch (error) {
      if (!error.response || error.response.status !== 401) {
        throw error;
      }
      navigateToLoginScreen();
    }
  } else {
    navigateToLoginScreen();
  }
}
