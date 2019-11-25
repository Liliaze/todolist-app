
export function setupErrorHandler(errorListener) {
  if (errorListener) {
    window.addEventListener('error', errorListener);
    window.addEventListener('unhandledrejection', event => errorListener(event.reason));
  }
}
