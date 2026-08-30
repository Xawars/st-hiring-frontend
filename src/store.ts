import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './features/events/eventsSlice.ts';
import settingsReducer from './features/settings/settingsSlice.ts';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
