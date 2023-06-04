document.addEventListener('DOMContentLoaded', function () {
  // elementos
  var searchInput = document.getElementById('search-input'); // Input de búsqueda
  var searchButton = document.getElementById('search-btn'); // Botón de búsqueda
  var generateButton = document.getElementById('generate-btn'); // Botón de generación aleatoria
  var pokemonContainer = document.getElementById('pokemon-container2'); // Contenedor del Pokémon
  var mainOverlay = document.getElementById('main-overlay'); // Capa de superposición

  pokemonContainer.style.display = 'none'; // Oculta el contenedor del Pokémon al cargar la página

  function showPokemon(pokemonData) {
    var pokemonName = pokemonData.name; // Nombre del Pokémon
    var pokemonNumber = pokemonData.id; // Número del Pokémon en la Pokédex
    var pokemonImageUrl = pokemonData.sprites.other['official-artwork'].front_default; // URL de la imagen del Pokémon

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

    pokemonContainer.innerHTML = html; // Inserta el contenido HTML del Pokémon en el contenedor
    pokemonContainer.style.display = 'block'; // Muestra el contenedor del Pokémon
    mainOverlay.style.display = 'block'; // Muestra la capa de superposición
  }

  function hidePokemonContainer() {
    pokemonContainer.style.display = 'none'; // Oculta el contenedor del Pokémon
    mainOverlay.style.display = 'none'; // Oculta la capa de superposición
  }

  function searchPokemon() {
    var searchTerm = searchInput.value.toLowerCase(); // búsqueda ingresada
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + searchTerm; // URL de la API

    hidePokemonContainer(); // Oculta el contenedor del Pokémon

    fetch(apiUrl)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('No se encontró ningún Pokémon con ese término de búsqueda.'); // Si la respuesta no es exitosa, lanza un error
        }
        return response.json();
      })
      .then(function (data) {
        showPokemon(data); // Muestra los datos del Pokémon obtenidos
      })
      .catch(function (error) {
        alert(error.message); // Muestra un mensaje de error en caso de que ocurra algún problema durante la búsqueda
      });
  }

  searchInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      searchPokemon(); // Si se presiona la tecla Enter en el input de búsqueda, realiza la búsqueda del Pokémon
      event.preventDefault(); // Evita el comportamiento predeterminado del Enter (enviar el formulario)
    }
  });

  searchButton.addEventListener('click', searchPokemon); // Al hacer clic en el botón de búsqueda, realiza la búsqueda del Pokémon

  generateButton.addEventListener('click', function () {
    var randomPokemonId = Math.floor(Math.random() * 898) + 1; // Genera un número aleatorio para el ID del Pokémon
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + randomPokemonId; // URL de la API para obtener los datos del Pokémon aleatorio

    hidePokemonContainer(); // Oculta el contenedor del Pokémon

    fetch(apiUrl)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('No se pudo generar un Pokémon aleatorio.'); // Si la respuesta no es exitosa, lanza un error
        }
        return response.json();
      })
      .then(function (data) {
        showPokemon(data); // Muestra los datos del Pokémon aleatorio obtenidos
      })
      .catch(function (error) {
        alert(error.message); // Muestra un mensaje de error en caso de que ocurra algún problema durante la generación aleatoria
      });
  });

  pokemonContainer.addEventListener('click', function (event) {
    if (event.target.id === 'close-btn') {
      hidePokemonContainer(); // Al hacer clic en el botón de cierre, oculta el contenedor del Pokémon
    }
  });
});
