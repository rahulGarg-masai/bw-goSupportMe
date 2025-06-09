import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPokemonStart, fetchPokemonSuccess, fetchPokemonError } from '../store/actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { pokemonList, loading, error } = useSelector(state => state.pokemon);

  useEffect(() => {
    const fetchPokemon = async () => {
      dispatch(fetchPokemonStart());
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
        const data = await response.json();
        
        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const details = await fetch(pokemon.url);
            return details.json();
          })
        );
        
        dispatch(fetchPokemonSuccess(detailedPokemon));
      } catch (err) {
        dispatch(fetchPokemonError(err.message));
      }
    };

    if (pokemonList.length === 0) {
      fetchPokemon();
    }
  }, [dispatch, pokemonList.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pokemon Dashboard</h1>
      <div>
        {pokemonList.map(pokemon => (
          <div key={pokemon.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} width="50" />
            <h3>{pokemon.name}</h3>
            <p>Base Experience: {pokemon.base_experience}</p>
            <p>Height: {pokemon.height}</p>
            <p>Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
            <Link to={`/details/${pokemon.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
