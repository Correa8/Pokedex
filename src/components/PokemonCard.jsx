import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/style/pokemonCard.css';
import { useNavigate } from 'react-router-dom';

const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemons] = useState(null);
  const navigate = useNavigate();

  const loadPokemon = async () => {
    const pokemonInfo = await getPokemonById(pokemonData.url);

    setPokemons(pokemonInfo);
  };

  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`, { state: { pokemon } });
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article onClick={handleClickNavigate} className="cards">
          <header>
            <div className="color">
              <div>
                <img
                  src={pokemon?.sprites.other['official-artwork'].front_default}
                  alt=""
                />
              </div>
            </div>
          </header>
          <section className="contenido-import">
            <section className="type">
              <h2 className="contain-name">{pokemon.name}</h2>
              <p className="title">Tipo</p>
              <p className="caracteris">{pokemon.types[0].type.name}</p>
            </section>
            <section className="card">
              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name}>
                  <h3>{stat.stat.name.toUpperCase()}</h3>
                  <p>{stat.base_stat}</p>
                </section>
              ))}
            </section>
          </section>
        </article>
      )}
    </>
  );
};

export default PokemonCard;
