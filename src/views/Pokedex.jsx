import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/userPagination';
import { Form } from 'react-router-dom';

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonType, setPokemonType] = useState('');
  const { pokemons, types } = useLoaderData();
  const pokemonsPagination = usePagination(pokemons, 50);

  const handleNameChange = (e) => {
    setPokemonName(e.target.value);
    setPokemonType('');
  };

  const handleTypeChange = (e) => {
    setPokemonType(e.target.value);
    setPokemonName('');
  };

  return (
    <div className="w-full p-5">
      <p>
        <span className="text-res-500 font-semibold">Bienvenido {user}, </span>
        Aqui podras encontrar tu pokemon favorito
      </p>

      <div className="flex flex-row gap-2">
        {pokemonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => pokemonsPagination.changePageTo(page)}
            className={pokemonsPagination.currentPage === page ? 'text-yellow-500' : ''}
          >
            {page}
          </button>
        ))}
      </div>

      <div>
        <Form>
          <h3 className="text-red-500">FIlter for search</h3>
          <input
            type="text"
            name="pokemon_name"
            className="shadow-wd border border-black"
            value={pokemonName}
            onChange={handleNameChange}
          />
          <div className="flex flex-row justify-between">
            di0
            <select name="pokemon_type" value={pokemonType} onChange={handleTypeChange}>
              <option value="" disabled>
                --Choose a type--
              </option>
              {types.map((type) => (
                <option key={type.url} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            <button className="bg-red-500 text-white p-2 hover:bg-red-400 rounded">
              Search
            </button>
          </div>
        </Form>
      </div>

      <section>
        {pokemonsPagination.listSlice.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonData={pokemon} />
        ))}
      </section>
    </div>
  );
};

export default Pokedex;
