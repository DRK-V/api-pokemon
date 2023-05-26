document.addEventListener('DOMContentLoaded', function () {
  // elementos
  var searchInput = document.getElementById('search-input');
  var searchButton = document.getElementById('search-btn');
  var generateButton = document.getElementById('generate-btn');
  var pokemonContainer = document.getElementById('pokemon-container2');
  var mainOverlay = document.getElementById('main-overlay');

  pokemonContainer.style.display = 'none';


  function showPokemon(pokemonData) {
    var pokemonName = pokemonData.name;
    var pokemonNumber = pokemonData.id;
    var pokemonImageUrl = pokemonData.sprites.other['official-artwork'].front_default;

    var html = `
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
      <button id="close-btn">Cerrar</button>
    `;

    pokemonContainer.innerHTML = html;
    pokemonContainer.style.display = 'block';
    mainOverlay.style.display = 'block';
  }


  function hidePokemonContainer() {
    pokemonContainer.style.display = 'none';
    mainOverlay.style.display = 'none';
  }


  function searchPokemon() {
    var searchTerm = searchInput.value.toLowerCase();


    var isPokedexNumber = /^\d+$/.test(searchTerm);


    var apiUrl;
    if (isPokedexNumber) {
      apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + searchTerm;
    } else {
      apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + searchTerm;
    }


    hidePokemonContainer();


    fetch(apiUrl)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('No se encontró ningún Pokémon con ese término de búsqueda.');
        }
        return response.json();
      })
      .then(function (data) {
        showPokemon(data);
      })
      .catch(function (error) {
        alert(error.message);
      });
  }


  searchInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      searchPokemon();
      event.preventDefault();
    }
  });


  searchButton.addEventListener('click', searchPokemon);

  generateButton.addEventListener('click', function () {

    var randomPokemonId = Math.floor(Math.random() * 898) + 1;


    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + randomPokemonId;

    hidePokemonContainer();


    fetch(apiUrl)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('No se pudo generar un Pokémon aleatorio.');
        }
        return response.json();
      })
      .then(function (data) {
        showPokemon(data);
      })
      .catch(function (error) {
        alert(error.message);
      });
  });


  pokemonContainer.addEventListener('click', function (event) {
    if (event.target.id === 'close-btn') {
      hidePokemonContainer();
    }
  });
});