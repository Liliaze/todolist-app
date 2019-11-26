
export function setupErrorHandler(errorListener) {
  if (typeof errorListener !== 'function') {
    throw new error('Invalid errorListener.');
  }
  window.addEventListener('error', errorListener);
  window.addEventListener('unhandledrejection', event => errorListener(event.reason));
}
