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
  }
};

export default LocalStorage;
