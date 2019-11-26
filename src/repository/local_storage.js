const LocalStorage = {
  get: function (key) {
    const jsonValue = window.localStorage.getItem(key);

    return jsonValue ? JSON.parse(jsonValue).value : null;
  },
  set: function (key, value) {
    const jsonValue = JSON.stringify({ value });

    window.localStorage.setItem(key, jsonValue);
  },
  remove: function (key) {
    window.localStorage.removeItem(key);
  },
  replace: function (key, value) {
    window.localStorage.removeItem(key);
    const jsonValue = JSON.stringify({ value });

    window.localStorage.setItem(key, jsonValue);
  },
  clear: function () {
    window.localStorage.clear();
  }
};

export default LocalStorage;
