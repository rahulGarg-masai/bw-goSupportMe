export const fetchPokemonStart = () => ({ type: 'FETCH_POKEMON_START' });
export const fetchPokemonSuccess = (data) => ({ type: 'FETCH_POKEMON_SUCCESS', payload: data });
export const fetchPokemonError = (error) => ({ type: 'FETCH_POKEMON_ERROR', payload: error });
export const setSelectedPokemon = (pokemon) => ({ type: 'SET_SELECTED_POKEMON', payload: pokemon });
