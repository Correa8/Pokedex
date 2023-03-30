import React, { useContext, useEffect, useState } from 'react';
import '../assets/style/pokedex.css';
import { useLoaderData } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/userPagination';
import { Form } from 'react-router-dom';

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const { pokemons, types, name, type } = useLoaderData();
  const [pokemonName, setPokemonName] = useState(name ?? '');
  const [pokemonType, setPokemonType] = useState(type ?? '');
  const pokemonsPagination = usePagination(pokemons, 50);

  const handleNameChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setPokemonType(e.target.value);
  };

  useEffect(() => {
    setPokemonName(name);
  }, [name]);

  useEffect(() => {
    setPokemonName(type);
  }, [type]);

  return (
    <div className="w-full p-5">
      <div className="container img">
      <p className="pokedex-container">
        <span className="text-res-100 font-semibold">Bienvenido {user}, </span>
        Aqui podras encontrar tu pokemon favorito
      </p>

      <div className="paginacion">
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

      <div className="container-select">
        <Form className="search">
          <h3 className="text-red-500">Filter for search</h3>
          <input
            type="text"
            name="pokemon_name"
            className="input"
            value={pokemonName}
            onChange={handleNameChange}
          />
          <div className="selectAll">
            <select name="pokemon_type" value={pokemonType} onChange={handleTypeChange}>
              <option value="">All</option>
              {types.map((type) => (
                <option key={type.url} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            <button className="button-container second">Search</button>
          </div>
        </Form>
      </div>
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
