const input = document.querySelector("input[type='text']");
const info = document.querySelector(".pokemon-info");

const url = `https://pokeapi.co/api/v2/pokemon`;

const throttle = (callback, delay = 1500) => {
  let timeoutId = null;
  
  if (typeof callback !== 'function') {
    throw new Error('Callback is not a function');
  }

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      try {
        const result = callback(...args);
        timeoutId = null;
        return result;
      } catch (error) {
        console.log(error)
      }
    }, delay);
  };
};

const fetchPokemon = async (pokemonName) => {
  try {
    if (typeof pokemonName !== 'string' || pokemonName.trim() === '') {
      throw new Error('Invalid pokemonName');
    }
    const response = await fetch(`${url}/${pokemonName}`);
    if (response.status === 200) {
      const data = await response.json();
      if (!data || data.error) {
        throw new Error('Invalid Pokemon');
      }
      return data;
    } else {
      throw new Error('Failed to fetch Pokemon');
    }
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    throw error;
  }
};

const showPokemonData = ({ name }) => {
  if (info) {
    const p = document.createElement("p");
    const textNode = document.createTextNode(name);
    p.appendChild(textNode);
    info.insertAdjacentElement('beforeend', p);
  }
};

const handleInput = async ({ target: { value: name } }) => {
  try {
    if (typeof name !== 'string' || name.trim() === '') {
      throw new Error('Invalid name');
    }
    const pokemonName = name;
    const data = await fetchPokemon(pokemonName);

    if (data !== null && data !== undefined) {
      try {
        showPokemonData(data);
      } catch (error) {
        console.error('Error showing Pokemon data:', error);
      }
    }
  } catch (error) {
    console.error('Error handling input:', error);
  }
};

input.addEventListener("input", throttle(handleInput));
