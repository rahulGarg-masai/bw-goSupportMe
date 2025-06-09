const initialState = {
  pokemonList: [],
  loading: false,
  error: null,
  selectedPokemon: null
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_POKEMON_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_POKEMON_SUCCESS':
      return { ...state, loading: false, pokemonList: action.payload };
    case 'FETCH_POKEMON_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_SELECTED_POKEMON':
      return { ...state, selectedPokemon: action.payload };
    default:
      return state;
  }
};

export default pokemonReducer;