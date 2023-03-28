import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Home = () => {
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const newNameValue = e.target.value;

    setNameValue(newNameValue);
    if (newNameValue === '') setNameError('Name is requiered');
    else if (!/^[A-Z][a-z]{2,}$/.test(newNameValue))
      setNameError('Only letters and blanks are allowed');
    else setNameError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameError) setUser(nameValue);
    navigate('/pokedex');
  };

  return (
    <div>
      <div>
        <img src="/homeFond.jpg" alt="" className="w-full h-96" />
        <div className="max-h-20 flex justify-center	">
          <img src="/pokedex_img.png" alt="Pokedex" className="max-h-20 	" />
        </div>
        <div className="text-center">
          <h1 className="text-red-500 text-center text-4xl font-bold">¡Hello Trainer!</h1>
          <p>Type your name to start</p>
        </div>
        <form
          className="flex flex-row justify-center items-center mt-8 "
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="shadow-md border border-black p-3"
            value={nameValue}
            onChange={handleChange}
          />
          <button type="submit" className="bg-red-500 text-white font-bold p-3">
            Start
          </button>
        </form>
        {nameError && <p className="text-red-500 text-center">{nameError}</p>}
        {user && <Navigate to="/pokedex" />}
      </div>
    </div>
  );
};

export default Home;
