// Elementos del DOM
const sliderContainer = document.getElementById("slider-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Lista de nombres de los Pokémon legendarios
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
];

let currentIndex = 0;
let slideInterval;

// Función para cargar un Pokémon en el slider
async function loadSliderPokemon(index) {
    const pokemonName = legendaryPokemonList[index];
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch Pokémon data");
        }
        const data = await response.json();

        const spriteUrl = data.sprites.other["official-artwork"].front_default;

        const imgElement = document.createElement("img");
        imgElement.src = spriteUrl;
        imgElement.classList.add("slider-image");
        sliderContainer.innerHTML = "";
        sliderContainer.appendChild(imgElement);
    } catch (error) {
        console.error(error);
    }
}

function showNextPokemon() {
    currentIndex++;
    if (currentIndex >= legendaryPokemonList.length) {
        currentIndex = 0;
    }
    loadSliderPokemon(currentIndex);
}

function startSlideInterval() {
    slideInterval = setInterval(showNextPokemon, 3000);
}


function stopSlideInterval() {
    clearInterval(slideInterval);
}

prevBtn.addEventListener("click", () => {
    stopSlideInterval();
    showPreviousPokemon();
});
nextBtn.addEventListener("click", () => {
    stopSlideInterval();
    showNextPokemon();
});


loadSliderPokemon(0);

startSlideInterval();
