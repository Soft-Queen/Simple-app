import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/userSlice'; // Import the slice reducer

const store = configureStore({
  reducer: {
    users: usersReducer, // Add your reducer here
  },
});

export default store;

// Types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
