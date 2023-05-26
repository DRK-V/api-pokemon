const pokeballButton = document.querySelector('#pokeball-button');
const pokeballAside = document.querySelector('#pokeball-aside');
const closeButton = document.querySelector('#close-button');
const overlay = document.querySelector('.overlay');
const pokemonContainer = document.querySelector('.pokemon-container3');
const closeContainerButton = document.querySelector('#close-container-button');

pokeballButton.addEventListener('click', () => {
  pokeballAside.classList.toggle('open');
  toggleButtonVisibility();
});

closeButton.addEventListener('click', () => {
  pokeballAside.classList.remove('open');
  toggleButtonVisibility();
  hidePokemonContainer();
});

overlay.addEventListener('click', () => {
  pokeballAside.classList.remove('open');
  toggleButtonVisibility();
  hidePokemonContainer();
});

closeContainerButton.addEventListener('click', () => {
  hidePokemonContainer();
});

function toggleButtonVisibility() {
  pokeballButton.classList.toggle('hidden');
}

function showPokemonContainer() {
  pokemonContainer.classList.add('open');
  overlay.style.display = 'block';
}

function hidePokemonContainer() {
  pokemonContainer.classList.remove('open');
  overlay.style.display = 'none';
}

const generationLinks = document.querySelectorAll('#pokeball-aside ul li a');

generationLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const generation = link.getAttribute('data-generation');

    fetch(`https://pokeapi.co/api/v2/generation/${generation}`)
      .then((response) => response.json())
      .then((data) => {
        const pokemonList = document.querySelector('.pokemon-list');
        pokemonList.innerHTML = '';

        const pokemonSpecies = data.pokemon_species;
        pokemonSpecies.sort((a, b) => {
          const idA = parseInt(a.url.split('/').slice(-2)[0]);
          const idB = parseInt(b.url.split('/').slice(-2)[0]);
          return idA - idB;
        });

        const fetchPromises = pokemonSpecies.map((species) => {
          return fetch(species.url)
            .then((response) => response.json());
        });

        Promise.all(fetchPromises)
          .then((pokemonDataArray) => {
            pokemonDataArray.forEach((pokemonData) => {
              const pokemonName = pokemonData.name;

              fetch(pokemonData.varieties[0].pokemon.url)
                .then((response) => response.json())
                .then((pokemonImageData) => {
                  const pokemonImage = pokemonImageData.sprites?.other?.['official-artwork']?.front_default;

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

                  pokemonList.appendChild(pokemonCard);
                })
                .catch((error) => {
                  console.log('Error al obtener datos de la imagen del Pokémon:', error);
                });
            });

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
