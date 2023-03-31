import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../assets/style/pokedexLayaout.css';

const PokedexLayaout = () => {
  const { removeUser } = useContext(UserContext);
  return (
    <div>
      <div className="container-log-out">
        <button className="log-out" onClick={removeUser}>
          Log Out
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default PokedexLayaout;
