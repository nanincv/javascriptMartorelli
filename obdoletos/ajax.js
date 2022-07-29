// URLS
const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/?limit=151";
const JSON_POST = "https://jsonplaceholder.typicode.com/posts";

// DOM
const container = document.querySelector("#container");
const btn = document.querySelector("#button");
const form = document.querySelector("#form");

// FUNCIONES
const capitalize = (str) => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

const obtenerPokemon = () => {
  container.innerHTML = '...Cargando';
  fetch(URL_POKEMON)
  .then((respuesta) => {
    console.log(respuesta);
    return respuesta.json();
  }).then(pokemonResults => {
    container.innerHTML = '';
    console.log(pokemonResults);
    const { results } = pokemonResults;

    for (const pokemon of results) {
      const {url, name} = pokemon;

      console.log(pokemon);
      const id = url.split('/')[url.split('/').length - 2];
      const element = document.createElement('div');
      element.className = 'card';
      element.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png">
        <h2 class="poke-name">#${id} - ${capitalize(name)}</h2>`;
      container.append(element);
    }

  })
  .catch(error => {
    console.log('Hago algo en caso que falle');
  }).finally(() => {

  });
}

const enviarInformacion = (info) => {
  fetch(JSON_POST, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then(res => res.json())
  .then(respuesta => {
    alert(`El correo ${respuesta.valor} ha sido registrado`);
    console.log(respuesta);
  })
}


// ASYNC - AWAIT - TRY - CATCH

const obtenerPokemonAsync = async () => {
  try {
  container.innerHTML = '...Cargando';
  const respuesta = await fetch(URL_POKEMON); 
  const pokemonResults = await respuesta.json();

  container.innerHTML = '';
  console.log(pokemonResults);
  const { results } = pokemonResults;

  for (const pokemon of results) {
    const {url, name} = pokemon;

    console.log(pokemon);
    const id = url.split('/')[url.split('/').length - 2];
    const element = document.createElement('div');
    element.className = 'card';
    element.innerHTML = `
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png">
      <h2 class="poke-name">#${id} - ${capitalize(name)}</h2>`;
    container.append(element);
  }
  } catch {
   console.log('Error'); 
  } finally {
    
  }
}


//LISTENERS
btn.addEventListener("click", () => {
  obtenerPokemonAsync();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const mail = document.getElementById('email');
  enviarInformacion({valor: mail.value});
});

