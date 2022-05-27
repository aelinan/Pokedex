const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemon = document.getElementById('pokemonName');
const searchButton = document.getElementById('searchPokemon');
const deleteButton = document.getElementById('deletePokemon');
const appNode = document.getElementById('app');

searchButton.addEventListener('click', insertPokemon)
searchButton.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // code for enter
    }
});
searchButton.addEventListener('touchstart', insertPokemon)

deleteButton.addEventListener('click', deletePokemon)
deleteButton.addEventListener('touchstart', deletePokemon)


function insertPokemon() {

    window.fetch(`${baseURL}${pokemon.value.toLowerCase()}`)

    .then(response => {
        if(response.status === 404){
            alert('This pokemon is not avialable. Try with another one!')
        } else {
            return response.json()
        }
    })

    .then(responseJSON => {
        const allItems = []
        const result = []
        for(let pokemonInfo in responseJSON){
            result.push([pokemonInfo, responseJSON[pokemonInfo]])
        }
        console.table(result)

        //crearImagen
        const pokemonImage = document.createElement('img')
        pokemonImage.src = result[14][1].front_default
        //Nombre 
        const pokemonName = document.createElement('h2')
        pokemonName.innerText = `Name: ${result[10][1]}`
        //ID
        const pokemonID = document.createElement('h2')
        pokemonID.innerText = `ID: # ${result[6][1]}`
        //Pokemon Type
        const pokemonType = document.createElement('h2')
        pokemonType.innerText = `Type: ${result[16][1][0].type.name}`
        //Container
        const container = document.createElement('div')
        container.append(pokemonImage, pokemonName, pokemonID, pokemonType)


        allItems.push(container)

        appNode.append(...allItems)
    })

}

function deletePokemon() {
    let allPokemon = appNode.childNodes
    allPokemon = Array.from(allPokemon)
    allPokemon.forEach(pokemon => {pokemon.remove(pokemon)})
}

