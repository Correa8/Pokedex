import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const PokedexLayaout = () => {
  const { removeUser } = useContext(UserContext);
  return (
    <div>
      <button
        className="bg-red-500 text-white p-2 hover:bg-red-400 rounded"
        onClick={removeUser}
      >
        Log Out
      </button>
      <Outlet />
    </div>
  );
};

export default PokedexLayaout;
