import { FullPokemon, Pokemon } from '../root/models/pokemon';
import { ApiPokemon } from '../api/pokemons';

export const serializePokemonData = (data: {
  name: string;
  types: { type: { name: string } }[];
}): Pokemon => {
  return { name: data.name, types: data.types.map((t) => t.type.name) };
};

export const serializeFullPokemonData = (data: ApiPokemon): FullPokemon => {
  return {
    name: data.name,
    types: data.types.map((t) => t.type.name),
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      effort: s.effort,
      baseStat: s.base_stat,
    })),
    abilities: data.abilities.map((a) => ({
      name: a.ability.name,
      isHidden: a.ability.is_hidden,
    })),
  };
};
