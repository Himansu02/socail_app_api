import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatReducer";
import userReducer from "./userReducer";
import socketReducer from "./socketReducer";
import postReducer from "./postReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['chat', 'user'],
}

const rootReducer=combineReducers({
  chat:chatReducer,
  socket:socketReducer,
  user:userReducer,
  post:postReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store=configureStore({

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['socket/getCurrentSocket',FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['socket.socket'],
      },
    }),
    reducer:persistedReducer,
})

export let persistor = persistStore(store)