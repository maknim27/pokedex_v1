const pokemonName = document.querySelector('.pokemon_name');

const pokemonNumber = document.querySelector('.pokemon_number');

const pokemonImage = document.querySelector('.pokemon_image');

const formulario = document.querySelector('.form');

const campo = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
    
    console.log(APIResponse);
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);

    if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    campo.value='';
    searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
}

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(campo.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);