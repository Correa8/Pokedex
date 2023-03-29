import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const pokemon = await getPokemonById(id);
      setPokemon(pokemon);
    };

    if (!state.pokemon) loadData();
    else setPokemon(state.pokemon);
  }, []);

  return (
    <div>
      {pokemon && (
        <>
          <h1>{pokemon.name}</h1>
          <div>
            <img
              src={pokemon?.sprites.other['official-artwork'].front_default}
              /* src={pokemon.sprites.other.dream_world.front_default} */
              alt={pokemon.name}
            />
            <h4>Specie : {pokemon.species.name}</h4>
            <h3>{id}</h3>
            <h3>Type : {}</h3>
            <h3>Habilidades : {pokemon.ability}</h3>
            <h3>Order : {pokemon.order}</h3>
            <h3>Experiencia : {pokemon.base_experience}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonDetail;
