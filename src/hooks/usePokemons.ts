import { useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from './redux';
import { fetchAllPokemonsThunk } from '../store/reducers/pokemons/thunks';
import { POKEMON_PER_PAGE } from '../root/consts';

export const usePokemons = () => {
  const dispatch = useAppDispatch();
  const pokemonsReducer = useAppSelector((state) => state.pokemonsReducer);
  const [chunk, setChunk] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [type, setType] = useState<string>();

  const types = useMemo(() => {
    return Array.from(
      new Set(pokemonsReducer.pokemons.flatMap((p) => p.types))
    );
  }, [pokemonsReducer.pokemons]);

  useEffect(() => {
    if (pokemonsReducer.pokemons.length > 0) {
      return;
    }
    dispatch(fetchAllPokemonsThunk());
  }, []);

  const nextChunk = async () => {
    setChunk((prev) => prev + 1);
  };

  const searchByName = (value: string) => {
    setChunk(1);
    setSearchValue(value);
  };

  const filterByType = (type: string) => {
    setChunk(1);
    setType(type);
  };

  const filteredPokemons = type
    ? pokemonsReducer.pokemons.filter((p) => p.types.includes(type))
    : pokemonsReducer.pokemons;

  const pokemonsWithSearch = searchValue
    ? filteredPokemons.filter((p) => p.name.includes(searchValue))
    : filteredPokemons;

  return {
    pokemons: pokemonsWithSearch.slice(
      0,
      chunk * POKEMON_PER_PAGE + POKEMON_PER_PAGE
    ),
    getPokemonsLoading: pokemonsReducer.getPokemonsLoading,
    getPokemonsError: pokemonsReducer.getPokemonsError,
    types,
    nextChunk,
    searchByName,
    filterByType,
  };
};
