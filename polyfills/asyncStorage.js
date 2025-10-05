// polyfills/asyncStorage.js
import localforage from 'localforage';

const AsyncStorage = {
    getItem: async (key) => {
        return await localforage.getItem(key);
    },
    setItem: async (key, value) => {
        await localforage.setItem(key, value);
    },
    removeItem: async (key) => {
        await localforage.removeItem(key);
    },
    clear: async () => {
        await localforage.clear();
    },
};

export default AsyncStorage;
