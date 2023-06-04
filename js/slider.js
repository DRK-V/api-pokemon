const sliderContainer = document.getElementById("slider-container"); // Obtener el contenedor del slider
const prevBtn = document.getElementById("prevBtn"); // Obtener el botón de "anterior"
const nextBtn = document.getElementById("nextBtn"); // Obtener el botón de "siguiente"

const legendaryPokemonList = [
  "mewtwo",
  "moltres",
  "zapdos",
  "articuno",
  "celebi",
  "lugia",
  "ho-oh",
  "suicune",
  "entei",
  "raikou",
  "regirock",
  "regice",
  "registeel",
  "latias",
  "latios",
  "kyogre",
  "groudon",
  "rayquaza",
  "jirachi",
  "deoxys",
  "arceus",
  "giratina",
  "palkia",
  "dialga"
]; // Lista de nombres de los Pokémon legendarios

let currentIndex = 0; // posision actual del Pokémon en el slider

function loadSliderPokemon(index) {
  const pokemonName = legendaryPokemonList[index]; // Obtener el nombre del Pokémon
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`; // URL de la API 

  fetch(apiUrl) // Realizar una solicitud a la API de PokeAPI
    .then(response => {
      if (!response.ok) { // Si la respuesta no es exitosa
        throw new Error("Error al obtener los datos de Pokémon"); // Lanzar un error
      }
      return response.json(); // Convertir la respuesta a formato JSON
    })
    .then(data => {
      const spriteUrl = data.sprites.other["official-artwork"].front_default; // Obtener la URL de la imagen del Pokémon

      const imgElement = document.createElement("img"); // Crear un elemento de imagen
      imgElement.src = spriteUrl; // Establecer la URL de la imagen
      imgElement.classList.add("slider-image"); // Agregar una clase a la imagen
      sliderContainer.innerHTML = ""; // Limpiar el contenedor del slider
      sliderContainer.appendChild(imgElement); // Agregar el elemento de imagen al contenedor
    })
    .catch(error => {
      console.error(error); // Manejar cualquier error ocurrido 
    });
}

function showPreviousPokemon() {
  currentIndex = (currentIndex - 1 + legendaryPokemonList.length) % legendaryPokemonList.length; //Pokémon anterior (manejando el bucle circular)
  loadSliderPokemon(currentIndex); // Cargar el Pokémon anterior en el slider
}

function showNextPokemon() {
  currentIndex = (currentIndex + 1) % legendaryPokemonList.length; //Pokémon siguiente (manejando el bucle circular)
  loadSliderPokemon(currentIndex); // Cargar el Pokémon siguiente en el slider
}

prevBtn.addEventListener("click", showPreviousPokemon); //  clic en el botón "anterior"
nextBtn.addEventListener("click", showNextPokemon); //  clic en el botón "siguiente"

loadSliderPokemon(currentIndex); // Cargar el primer Pokémon en el slider al cargar la página
