
const LocalStorage = {
    get: function (key) {
        const jsonValue = window.localStorage.getItem(key);

        return JSON.parse(jsonValue).value;
    },
    set: function (key, value) {
        const jsonValue = JSON.stringify({ value });

        window.localStorage.setItem(key, jsonValue);
    },
};

export default LocalStorage;