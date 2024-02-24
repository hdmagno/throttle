const input = document.querySelector("input[type='text']");
const info = document.querySelector(".pokemon-info");

const url = `https://pokeapi.co/api/v2/pokemon`;

const throttle = (callback, delay = 1500) => {
  let timeoutId = null;

  return (...args) => {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        callback(...args);
        timeoutId = null;
      }, delay);
    }
  };
};

const fetchPokemon = async (pokemonName) => {
  const response = await fetch(`${url}/${pokemonName}`);
  return await response.json();
};

const showPokemonData = ({ name }) => {
  const p = document.createElement("p");
  p.textContent = name;
  info.appendChild(p);
};

const handleInput = async ({ target: { value: name } }) => {
  const pokemonName = name;
  const data = await fetchPokemon(pokemonName);

  showPokemonData(data);
};

input.addEventListener("input", throttle(handleInput));
