import { configureStore } from '@reduxjs/toolkit';
import uploadReducer from './uploadSlice';
import { testApi } from './testSlice';
import { userApi } from './userSlice';

const store = configureStore({
  reducer: {
    upload: uploadReducer,
    [testApi.reducerPath]: testApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(testApi.middleware).concat(userApi.middleware),
});

export default store;
