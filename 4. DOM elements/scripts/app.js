const container = document.querySelector('#container');
const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

for (let i=1; i<152; i++) {
    let pokemon = document.createElement('div');
    let pokemonImg = document.createElement('img');
    let pokemonSpan = document.createElement('span');

    pokemonImg.src = `${baseURL}${i}.png`;
    pokemonSpan.innerText = `${i}`;

    pokemon.classList.add('pokemon');

    container.appendChild(pokemon);
    pokemon.appendChild(pokemonImg);
    pokemon.appendChild(pokemonSpan);

}