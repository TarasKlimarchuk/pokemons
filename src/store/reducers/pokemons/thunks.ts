import { createAsyncThunk } from '@reduxjs/toolkit';

import { PokemonsApi } from '../../../api/pokemons';
import { addPokemons } from './pokemonsSlice';

const getPokemonsChunk = async (
  pokemonsCount: number,
  chunkCount: number,
  chunk: number
) => {
  const res = await Promise.allSettled(
    new Array(chunk)
      .fill(0)
      .map((_, i) => i + 1 + chunkCount)
      .map(async (id) => {
        const adjustedId = id > 1017 ? id - 1017 + 10000 : id;
        return await PokemonsApi.getPokemonByID(adjustedId);
      })
  );

  //@ts-ignore
  return res.filter((p) => p.status === 'fulfilled').map((p) => p.value);
};

export const fetchAllPokemonsThunk = createAsyncThunk(
  'pokemons/fetchPokemons',
  async (_, thunkAPI) => {
    const pokemonsCount = await PokemonsApi.getPokemonsCount();

    let fetchedPokemonCount = 0;
    const pokemonsPerChunk = 20;

    let pokemonsChunk = [];

    while (fetchedPokemonCount !== pokemonsCount) {
      const chunk =
        fetchedPokemonCount + pokemonsPerChunk > pokemonsCount
          ? pokemonsCount - fetchedPokemonCount
          : pokemonsPerChunk;
      pokemonsChunk.push(
        ...(await getPokemonsChunk(pokemonsCount, fetchedPokemonCount, chunk))
      );
      fetchedPokemonCount += chunk;

      if (
        pokemonsChunk.length > pokemonsPerChunk * 5 ||
        chunk < pokemonsPerChunk
      ) {
        thunkAPI.dispatch(addPokemons(pokemonsChunk));
        pokemonsChunk = [];
      }
    }

    return true;
  }
);
