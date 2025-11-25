import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from './slices/accountsSlice';
import billsReducer from './slices/billsSlice';
import incomeReducer from './slices/incomeSlice';
import transactionsReducer from './slices/transactionsSlice';
import uiReducer from './slices/uiSlice';
import { loadState, saveState } from './localStorage';

// Load persisted state from localStorage
const persistedState = loadState();

export const store = configureStore({
    reducer: {
        income: incomeReducer,
        bills: billsReducer,
        transactions: transactionsReducer,
        accounts: accountsReducer,
        ui: uiReducer,
    },
    ...(persistedState && { preloadedState: persistedState }),
});

// Subscribe to store changes and save to localStorage
// Debounce to avoid excessive writes
let saveTimeout: ReturnType<typeof setTimeout>;
store.subscribe(() => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        saveState(store.getState());
    }, 1000); // Save 1 second after last change
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
