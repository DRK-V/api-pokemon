//CARD INICIO
// OBTENER DATOS
const container = document.getElementById('listaPokemon');


async function fetchPokemonData() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); // Obtener los primeros 151 Pokémon
    const data = await response.json();
    const pokemonList = data.results;

    for (const pokemon of pokemonList) {

      const pokemonDataResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonDataResponse.json();


      function getBackgroundColor(type) {
        switch (type) {
          case 'normal':
            return 'var(--type-normal)';
          case 'fire':
            return 'var(--type-fire)';
          case 'water':
            return 'var(--type-water)';
          case 'grass':
            return 'var(--type-grass)';
          case 'electric':
            return 'var(--type-electric)';
          case 'ice':
            return 'var(--type-ice)';
          case 'fighting':
            return 'var(--type-fighting)';
          case 'poison':
            return 'var(--type-poison)';
          case 'ground':
            return 'var(--type-ground)';
          case 'flying':
            return 'var(--type-flying)';
          case 'psychic':
            return 'var(--type-psychic)';
          case 'bug':
            return 'var(--type-bug)';
          case 'rock':
            return 'var(--type-rock)';
          case 'ghost':
            return 'var(--type-ghost)';
          case 'dark':
            return 'var(--type-dark)';
          case 'dragon':
            return 'var(--type-dragon)';
          case 'steel':
            return 'var(--type-steel)';
          case 'fairy':
            return 'var(--type-fairy)';
          default:
            return 'var(--clr-black)';
        }
      }

      const card = document.createElement('div');
      card.className = 'pokemon ';


      const backgroundColor = getBackgroundColor(pokemonData.types[0].type.name);


      card.addEventListener('mouseover', () => {
        card.style.backgroundColor = backgroundColor;
      });


      card.addEventListener('mouseout', () => {
        card.style.backgroundColor = '';
      });

      card.addEventListener('click', () => {
        showPokemonDetails(pokemonData);
      });


      card.innerHTML = `
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
            ${pokemonData.types
          .map((type) => `<p class="${type.type.name}">${type.type.name.toUpperCase()}</p>`)
          .join('')}
          </div>
        </div>
      `;

      container.appendChild(card);
    }
  } catch (error) {
    console.log(error);
  }
}

function showPokemonDetails(pokemonData) {
  const pokemonDetails = document.createElement('div');
  pokemonDetails.className = 'pokemon-details';
  var pokemonName = pokemonData.name;
  var pokemonNumber = pokemonData.id;
  var pokemonImageUrl = pokemonData.sprites.other['official-artwork'].front_default;

  pokemonDetails.innerHTML = `
  <div class='name'>${pokemonName}</div>
      <div class='id'>N° ${pokemonNumber.toString().padStart(3, '0')}</div>
      <div class='pokemon-img'>
        <div class='item'>
          <img src='${pokemonImageUrl}' alt=''>
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
          ${pokemonData.types.map(type => `<div class="type ${type.type.name}">${type.type.name}</div>`).join('')}
        </div>
        <div class="poke-chart ${pokemonData.types[0].type.name}">
          <div class="title-chart">Stats:</div>
          <div class="content" id="recebeGrafico">
            ${pokemonData.stats.map(stat => `
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
    <!-- Agrega más detalles según tus necesidades -->

    <button onclick="closePokemonDetails()">Close</button>
  `;

  container.appendChild(pokemonDetails);
}

function closePokemonDetails() {
  const pokemonDetails = document.querySelector('.pokemon-details');
  container.removeChild(pokemonDetails);
}

fetchPokemonData();
