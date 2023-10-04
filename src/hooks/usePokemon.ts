import { useEffect, useState } from 'react';

import { PokemonsApi } from '../api/pokemons';
import { FullPokemon } from '../root/models/pokemon';
import { is404requestError } from '../utils/is404requestError';

export const usePokemon = (id: string) => {
  const [pokemon, setPokemon] = useState<FullPokemon | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!pokemon) {
      (async () => {
        try {
          setError('');
          setLoading(true);
          setPokemon(await PokemonsApi.getPokemonByID(id));
        } catch (e) {
          let message;
          if (e instanceof Error) {
            message = is404requestError(e) ? 'Pokemon is not found' : e.message;
          } else {
            message = 'Unknown error';
          }
          setError(message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  return {
    pokemon,
    loading,
    error,
  };
};
