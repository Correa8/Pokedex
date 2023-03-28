import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { usePagination } from '../hooks/userPagination';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';

const getAllPokemons = async () => {
  try {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=2000');

    return res.data.results;
  } catch (error) {
    console.error(error);
  }
};

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const [pokemons, setPokemons] = useState([]);
  const pokemonsPagination = usePagination(pokemons, 50);

  const loadAllPokemons = async () => {
    const allPokemons = await getAllPokemons();

    setPokemons(allPokemons);
  };

  useEffect(() => {
    loadAllPokemons();
  }, []);

  return (
    <div className="w-full p-5">
      <p>
        <span className="text-res-500 font-semibold">Bienvenido {user}, </span>
        aqui podras encontrar tu pokemon favorito
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

      <section>
        {pokemonsPagination.listSlice.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonData={pokemon} />
        ))}
      </section>
    </div>
  );
};

export default Pokedex;
