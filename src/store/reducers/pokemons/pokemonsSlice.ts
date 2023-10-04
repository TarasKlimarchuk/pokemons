import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../../root/types';
import { Pokemon } from '../../../root/models/pokemon';
import { fetchAllPokemonsThunk } from './thunks';

export type PokemonsState = {
  pokemons: Pokemon[];
  getPokemonsLoading: LoadingStatus;
  getPokemonsError: string;
};

const initialState: PokemonsState = {
  pokemons: [],
  getPokemonsLoading: LoadingStatus.DEFAULT,
  getPokemonsError: '',
};

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setGetPokemonsLoading: (state, action: PayloadAction<LoadingStatus>) => {
      state.getPokemonsLoading = action.payload;
    },
    addPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemons.push(...action.payload);
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPokemonsThunk.pending, (state) => {
      state.getPokemonsLoading = LoadingStatus.LOADING;
      state.getPokemonsError = '';
    });
    builder.addCase(fetchAllPokemonsThunk.fulfilled, (state) => {
      state.getPokemonsLoading = LoadingStatus.SUCCESS;
    });
    builder.addCase(fetchAllPokemonsThunk.rejected, (state, action) => {
      state.getPokemonsError = action.error.message || '';
      state.getPokemonsLoading = LoadingStatus.ERROR;
    });
  },
});

export const { setGetPokemonsLoading, addPokemons } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
