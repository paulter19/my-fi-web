// LocalStorage utility functions for Redux store persistence

const STORAGE_KEY = 'my-fi-app-state';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(STORAGE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading state from localStorage:', err);
        return undefined;
    }
};

export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (err) {
        console.error('Error saving state to localStorage:', err);
    }
};
