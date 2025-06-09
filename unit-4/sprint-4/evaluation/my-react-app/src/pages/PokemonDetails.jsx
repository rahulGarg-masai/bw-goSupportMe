import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPokemon } from '../store/actions';

const PokemonDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedPokemon, pokemonList } = useSelector(state => state.pokemon);

  useEffect(() => {
    const pokemon = pokemonList.find(p => p.id.toString() === id);
    if (pokemon) {
      dispatch(setSelectedPokemon(pokemon));
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => dispatch(setSelectedPokemon(data)));
    }
  }, [id, dispatch, pokemonList]);

  if (!selectedPokemon) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{selectedPokemon.name}</h1>
      <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} width="200" />
      <div>
        <h3>Details:</h3>
        <p>Weight: {selectedPokemon.weight}</p>
        <p>Height: {selectedPokemon.height}</p>
        <p>Base Experience: {selectedPokemon.base_experience}</p>
        
        <h3>Types:</h3>
        <ul>
          {selectedPokemon.types.map((type, index) => (
            <li key={index}>{type.type.name}</li>
          ))}
        </ul>
        
        <h3>Abilities:</h3>
        <ul>
          {selectedPokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
        
        <h3>Base Stats:</h3>
        <ul>
          {selectedPokemon.stats.map((stat, index) => (
            <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetails;