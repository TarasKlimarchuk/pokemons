export interface Pokemon {
  name: string;
  types: string[];
}

export namespace FullPokemon {
  export interface Stat {
    baseStat: number;
    effort: number;
    name: string;
  }

  export interface Ability {
    name: string;
    isHidden: boolean;
  }
}

export interface FullPokemon extends Pokemon {
  abilities: FullPokemon.Ability[];
  stats: FullPokemon.Stat[];
}
