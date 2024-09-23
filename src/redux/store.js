import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER } from 'redux-persist';

import authReducer from './reducers/auth';
import companiesReducer from './reducers/companies';
import movementsReducer from './reducers/movements';

const persistConfig = {
   key: 'root',
   storage: AsyncStorage,
};

const rootReducer = combineReducers({
   auth: authReducer,
   companies: companiesReducer,
   movements: movementsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
   reducer: persistedReducer,
   // pending: revisar si es necesario este middleware
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER],
         },
      }),
});

const persistor = persistStore(store);

export { store, persistor };
