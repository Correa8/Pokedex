import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import '../assets/style/pokedexDetail.css';

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
        <div className="box">
          <h1 className="name">{pokemon.name}</h1>
          <div>
            <img
              src={pokemon?.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
            />
            <hr />
            <hr />
            <h4 className="specie">Specie : {pokemon.species.name}</h4>
            <h2 className="number"> Number :{id}</h2>
            <h3 className="type">Type : {pokemon.types[0].type.name}</h3>
            <h3 className="habily">Habilidades : {pokemon.abilities[0].ability.name}</h3>
            <h3 className="order">Order : {pokemon.order}</h3>
            <h3 className="experiens">Experiencia : {pokemon.base_experience}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
