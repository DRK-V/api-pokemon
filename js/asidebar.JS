// Selección de elementos del DOM
const pokeballButton = document.querySelector('#pokeball-button');
const pokeballAside = document.querySelector('#pokeball-aside');
const closeButton = document.querySelector('#close-button');
const overlay = document.querySelector('.overlay');
const pokemonContainer = document.querySelector('.pokemon-container3');
const closeContainerButton = document.querySelector('#close-container-button');

// Evento de clic en el botón de la pokeball
pokeballButton.addEventListener('click', () => {
  pokeballAside.classList.toggle('open');
  toggleButtonVisibility();
});

// Evento de clic en el botón de cerrar
closeButton.addEventListener('click', () => {
  pokeballAside.classList.remove('open');
  toggleButtonVisibility();
  hidePokemonContainer();
});

// Evento de clic en el overlay
overlay.addEventListener('click', () => {
  pokeballAside.classList.remove('open');
  toggleButtonVisibility();
  hidePokemonContainer();
});

// Evento de clic en el botón de cerrar del contenedor de Pokémon
closeContainerButton.addEventListener('click', () => {
  hidePokemonContainer();
});

// Función visibilidad del botón de la pokeball
function toggleButtonVisibility() {
  pokeballButton.classList.toggle('hidden');
}

// Función para mostrar el contenedor de Pokémon
function showPokemonContainer() {
  pokemonContainer.classList.add('open');
  overlay.style.display = 'block';
}

// Función para ocultar el contenedor de Pokémon
function hidePokemonContainer() {
  pokemonContainer.classList.remove('open');
  overlay.style.display = 'none';
}

// Obtener todos los enlaces de generaciones
const generationLinks = document.querySelectorAll('#pokeball-aside ul li a');

// enlace de generación
generationLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    // Obtener el atributo de generación del enlace
    const generation = link.getAttribute('data-generation');

    // Obtener los datos de la generación desde la API
    fetch(`https://pokeapi.co/api/v2/generation/${generation}`)
      .then((response) => response.json())
      .then((data) => {
        // Limpiar la lista de Pokémon
        const pokemonList = document.querySelector('.pokemon-list');
        pokemonList.innerHTML = '';

        // Obtener las especies de Pokémon y ordenarlas por ID
        const pokemonSpecies = data.pokemon_species;
        pokemonSpecies.sort((a, b) => {
          const idA = parseInt(a.url.split('/').slice(-2)[0]);
          const idB = parseInt(b.url.split('/').slice(-2)[0]);
          return idA - idB;
        });

        // Crear un array para obtener los datos de cada Pokémon
        const fetchPromises = pokemonSpecies.map((species) => {
          return fetch(species.url)
            .then((response) => response.json());
        });

        // Obtener todos los datos de los Pokémon en paralelo
        Promise.all(fetchPromises)
          .then((pokemonDataArray) => {
            //  datos de cada Pokémon
            pokemonDataArray.forEach((pokemonData) => {
              const pokemonName = pokemonData.name;

              // Obtener los datos de la imagen del Pokémon
              fetch(pokemonData.varieties[0].pokemon.url)
                .then((response) => response.json())
                .then((pokemonImageData) => {
                  const pokemonImage = pokemonImageData.sprites?.other?.['official-artwork']?.front_default;

                  // Crear el elemento de tarjeta para el Pokémon
                  const pokemonCard = document.createElement('div');
                  pokemonCard.className = 'pokemon-card';
                  pokemonCard.innerHTML = `
                    <div class="electric1"></div>
                    <div class="ico">
                      <img src="${pokemonImage}" alt="${pokemonName}">
                    </div>
                    <div class="pokemon-imagen">
                      <img src="${pokemonImage}" alt="${pokemonName}">
                    </div>
                    <div class="pokemon-info">
                      <div class="nombre-contenedor">
                        <p class="pokemon-id">#${pokemonData.id.toString().padStart(3, '0')}</p>
                        <h2 class="pokemon-nombre">${pokemonName}</h2>
                      </div>
                      <div class="pokemon-tipos">
                        ${pokemonData.types
                      ? pokemonData.types
                        .map((type) => `<p class="${type.type.name}">${type.type.name.toUpperCase()}</p>`)
                        .join('')
                      : ''}
                      </div>
                    </div>
                  `;

                  // Agregar la tarjeta del Pokémon a la lista
                  pokemonList.appendChild(pokemonCard);
                })
                .catch((error) => {
                  console.log('Error al obtener datos de la imagen del Pokémon:', error);
                });
            });

            // Cerrar el menú de la pokeball, ocultar el botón y mostrar el contenedor de Pokémon
            pokeballAside.classList.remove('open');
            toggleButtonVisibility();
            showPokemonContainer();
          })
          .catch((error) => {
            console.log('Error al obtener datos de los Pokémon:', error);
          });
      })
      .catch((error) => {
        console.log('Error al obtener datos de la generación:', error);
      });
  });
});