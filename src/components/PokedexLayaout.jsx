import React from 'react';
import { Outlet } from 'react-router-dom';

const PokedexLayaout = () => {
  return (
    <div>
      <h1>Pokedex Layaout</h1>
      <Outlet />
    </div>
  );
};

export default PokedexLayaout;
