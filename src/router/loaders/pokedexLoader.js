import { getAllPokemons } from '../../services/getAllPokemons';
import { getAllTypes } from '../../services/getAllTypes';
import { getPokemonByType } from '../../services/getPokemonByType';

const whichLoadIs = (url) => {
  if (!url.search) return 'all';
  else if (url.searchParams.get('pokemon_type')) return 'type';
  else if (url.searchParams.get('pokemon_name')) return 'name';
};

export const pokedexLoader = async ({ request }) => {
  const types = await getAllTypes();
  const url = new URL(request.url);
  const loadType = whichLoadIs(url);
  let pokemons;

  if (loadType === 'all') {
    pokemons = await getAllPokemons();
  } else if (loadType === 'type') {
    const type = url.searchParams.get('pokemon_type');
    pokemons = await getPokemonByType(type);
  } else if (loadType === 'name') {
    const name = url.searchParams.get('pokemon_name').toLocaleLowerCase();
    pokemons = await getAllPokemons();
    pokemons = pokemons.filter((pokemon) => pokemon.name.includes(name));
  }

  return { pokemons, types };
};
