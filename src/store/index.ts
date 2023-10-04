import { configureStore } from '@reduxjs/toolkit';

import pokemonsReducer from './reducers/pokemons/pokemonsSlice';

export const store = configureStore({
  reducer: {
    pokemonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
