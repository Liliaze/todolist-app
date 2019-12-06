export const StorageAction = Object.freeze({
  Get: 'get',
  Set: 'set',
  Remove: 'remove',
  Clear: 'clear',
});

/**
 *
 * @param {{get: key => value, set: (key, value) => void, remove: key => void, clear: () => void}} storageAdapter
 */
export const Storage = storageAdapter => {
  const listeners = {}; // : Array<{ [key: string]: Array<(newValue: mixed) => void> }>

  return {
    addDataUpdateListener: (key, callback) => {
      listeners[key] = listeners[key] ? listeners[key].concat(callback) : [callback];
    },
    removeDataUpdateListener: (key, callback) => {
      if (listeners[key] != null) {
        listeners[key] = listeners[key].filter(fun => fun !== callback);
      }
    },

    get: storageAdapter.get,
    set: (key, value) => {
      if (listeners[key]) {
        listeners[key].forEach(callback => callback(value, key, StorageAction.Set));
      }
      return storageAdapter.set(key, value);
    },
    remove: key => {
      if (listeners[key]) {
        listeners[key].forEach(callback => callback(null, key, StorageAction.Remove));
      }
      return storageAdapter.remove(key);
    },
    clear: () => {
      Object.keys(listeners).forEach(key => listeners[key].forEach(callback => callback(null, key, StorageAction.Clear)));
      return storageAdapter.clear();
    },
  };
};

export default Storage;
