// Contenedor donde se mostrarán los Pokémon
const container = document.getElementById('listaPokemon');

// Obtener los datos de los primeros 151 Pokémon
async function fetchPokemonData() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    const pokemonList = data.results;

    // Direccion donde estará cada Pokémon en la lista
    for (const pokemon of pokemonList) {
      // Obtener los detalles de cada Pokémon
      const pokemonData = await fetchPokemonDetails(pokemon.url);
      // Obtener el color de fondo según el tipo del Pokémon
      const backgroundColor = getBackgroundColor(pokemonData.types[0].type.name);
      // Crear tarjeta para el Pokémon
      createPokemonCard(pokemonData, backgroundColor);
    }
  } catch (error) {
    console.log(error);
  }
}

// Obtener los detalles de un Pokémon
async function fetchPokemonDetails(url) {
  const response = await fetch(url); //los await solo funcionan dentro del async
  const data = await response.json();
  return data;
}

// Obtener el color de fondo según el tipo del Pokémon
function getBackgroundColor(type) {
  const typeColors = {
    normal: 'var(--type-normal)',
    fire: 'var(--type-fire)',
    water: 'var(--type-water)',
    grass: 'var(--type-grass)',
    electric: 'var(--type-electric)',
    ice: 'var(--type-ice)',
    fighting: 'var(--type-fighting)',
    poison: 'var(--type-poison)',
    ground: 'var(--type-ground)',
    flying: 'var(--type-flying)',
    psychic: 'var(--type-psychic)',
    bug: 'var(--type-bug)',
    rock: 'var(--type-rock)',
    ghost: 'var(--type-ghost)',
    dark: 'var(--type-dark)',
    dragon: 'var(--type-dragon)',
    steel: 'var(--type-steel)',
    fairy: 'var(--type-fairy)',
    default: 'var(--clr-black)'
  };
  return typeColors[type] || typeColors.default;
}

// Crear tarjeta para el Pokémon
function createPokemonCard(pokemonData, backgroundColor) {
  const card = document.createElement('div');
  card.className = 'pokemon';
//funcion para k la targeta cambie de color al pasar el mause
  card.addEventListener('mouseover', () => {
    card.style.backgroundColor = backgroundColor;
  });
//funcion para k la targeta buelva a su color original
  card.addEventListener('mouseout', () => {
    card.style.backgroundColor = '';
  });
//funcion click de las targetas para ver mas datos
  card.addEventListener('click', () => {
    showPokemonDetails(pokemonData);
  });
//estroctura html de las card k se veran al iniciar la pagina
  const cardHTML = `
    <div class="electric1"></div>
    <div class="ico">
      <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${pokemonData.name}">
    </div>
    <div class="pokemon-imagen">
      <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${pokemonData.name}">
    </div>
    <div class="pokemon-info">
      <div class="nombre-contenedor">
        <p class="pokemon-id">#${pokemonData.id.toString().padStart(3, '0')}</p>
        <h2 class="pokemon-nombre">${pokemonData.name}</h2>
      </div>
      <div class="pokemon-tipos">
        ${pokemonData.types.map((type) => `<p class="${type.type.name}">${type.type.name.toUpperCase()}</p>`).join('')}
      </div>
    </div>
  `;

  card.innerHTML = cardHTML;
  container.appendChild(card);
}

// Mostrar los detalles de un Pokémon
function showPokemonDetails(pokemonData) {
  const pokemonDetails = document.createElement('div');
  pokemonDetails.className = 'pokemon-details';
//estroctura html del contenedor k mostrara mas informacion del pokemon
  const pokemonHTML = `
    <div class='name'>${pokemonData.name}</div>
    <div class='id'>N° ${pokemonData.id.toString().padStart(3, '0')}</div>
    <div class='pokemon-img'>
      <div class='item'>
        <img src='${pokemonData.sprites.other['official-artwork'].front_default}' alt=''>
      </div>
    </div>

    <div class="todo">
      <div class="height-weight">
        <div class="item">
          <div class="content-item">${pokemonData.height / 10} m</div><small>Height</small>
        </div>
        <div class="item">
          <div class="content-item">${pokemonData.weight / 10} kg</div><small>Weight</small>
        </div>
      </div>
      <div class="types">
        <div class="title">Types:</div>
        ${pokemonData.types.map((type) => `<div class="type ${type.type.name}">${type.type.name}</div>`).join('')}
      </div>
      <div class="poke-chart ${pokemonData.types[0].type.name}">
        <div class="title-chart">Stats:</div>
        <div class="content" id="recebeGrafico">
          ${pokemonData.stats.map((stat) => `
            <div class="pontos">
              <div class="item-pontos">
                <div class="title-pontos">${stat.stat.name}</div>
                <div class="content-pontos" style="width:calc(${stat.base_stat / 2.55}% - 100px);">
                  ${stat.base_stat}
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <button id="closeBtn" class="sticky" onclick="closePokemonDetails()">Close</button>
  `;

  // Asignar el HTML de los detalles del Pokémon a la propiedad innerHTML
pokemonDetails.innerHTML = pokemonHTML;
// Agregar los detalles del Pokémon al contenedor
container.appendChild(pokemonDetails);

}

// Cerrar los detalles de un Pokémon
function closePokemonDetails() {
  const pokemonDetails = document.querySelector('.pokemon-details');
  container.removeChild(pokemonDetails);
}

// Llamar a la función para obtener y mostrar los datos de los Pokémon
fetchPokemonData();
