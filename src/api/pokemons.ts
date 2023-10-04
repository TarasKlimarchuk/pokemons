import makeRequest from './makeRequest';
import { FullPokemon } from '../root/models/pokemon';
import { API_URL } from '../root/consts';
import { serializeFullPokemonData } from '../utils/serializePokemonData';

export interface ApiPokemon {
  name: string;
  types: {
    type: { name: string };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }[];
  abilities: { ability: { name: string; is_hidden: boolean } }[];
}

export const PokemonsApi = {
  getPokemonsCount: async (): Promise<number> => {
    const response = await makeRequest<{
      count: number;
    }>({
      url: API_URL + 'pokemon',
      params: {
        offset: 0,
        limit: 0,
      },
    });

    return response.count;
  },
  getPokemonByID: async (id: number | string): Promise<FullPokemon> => {
    const pokemon = await makeRequest<ApiPokemon>({
      url: `${API_URL}pokemon/${id}`,
    });

    return serializeFullPokemonData(pokemon);
  },
};
