import * as Action from './controller/action.js';
import { setupErrorHandler } from './controller/errorHandler.js';

window.addEventListener('load', main);

function main() {
  setupErrorHandler(error => alert(error.message)); // TODO: to improve

  const authToken = Action.getLocalAuthToken();
  console.log(">>>>", { authToken })

  if (authToken) {
    try {
      Action.navigateToTodoScreen();
    } catch (error) {
      if (!error.response || error.response.status !== 401) {
        throw error;
      }
      Action.navigateToLoginScreen();
    }
  } else {
    Action.navigateToLoginScreen();
  }
}
