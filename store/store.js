import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

///////////////////////// uncoment when need to use persisitor in producion mode ////////////////////////////////////

// Configuration for Redux Persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

// Combine reducers (if you have more slices in the future)
const rootReducer = combineReducers({
  admin: adminReducer, 
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the check for non-serializable values
    }),
});

export const persistor = persistStore(store);