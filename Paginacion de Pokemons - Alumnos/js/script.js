const pokemonContainer = document.querySelector(".pokemon-container")
const fragmentPokemon = document.createDocumentFragment()
const navPk = document.querySelector(".nav-pokemon")

//Nums para a paxinacion
var numIni = 1
var numFin = 25 


//FUNCION AJAX 
function ajax(options){
    let { url, method, success, error, data } = options;

    let fetchOptions = {
        method: method ||  "GET",
        body: data
    }

    fetch(url, fetchOptions)
    .then(res => {return (res.ok) ? res.json(): Promise.reject(res)})
    .then(response => success(response))
    .catch(err => error(err))
}

//Peticion por id do pokemon
function fetchPokemon(id){
    ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
        success: pokemon => {mostrarPokemon(pokemon)},
        error: e => {console.log("ERROR " + JSON.stringify(e))}
    })
}

//Funcion para crear unha carta pokemon

function mostrarPokemon(pokemon){
    const main = document.querySelector(".pokemon-container")
    const cardPokemon = document.createElement("div")
    const divPokemon = document.createElement("div")
    const imgPokemon = document.createElement("img")
    const h5 = document.createElement("h5")
    const cardText = document.createElement("p")

    cardPokemon.classList.add("card")
    divPokemon.classList.add("card-body")
    h5.classList.add("card-title")
    cardText.classList.add("card-text")
    imgPokemon.classList.add("card-img-top")

    imgPokemon.src = pokemon.sprites.front_shiny
    h5.textContent = pokemon.name
    cardText.textContent = "Experience Base: " + pokemon.base_experience

    divPokemon.appendChild(imgPokemon)
    divPokemon.appendChild(h5)
    divPokemon.appendChild(cardText)
    cardPokemon.appendChild(divPokemon)
    main.appendChild(cardPokemon)
}

//Función para mostrar 25 pokemones
function mostrarPokemones(numIni = 1, numFin = 25){
    for(let i = numIni; i < 26; i++){
        fetchPokemon(i)
        
    }
}

//Función para crear botóns
function buttons(){
    let buttonLeft = document.createElement("button")
    buttonLeft.textContent = "IZQ"
    buttonLeft.setAttribute("id", "izq")
    let buttonRight = document.createElement("button")
    buttonRight.textContent = "DER"
    buttonRight.setAttribute("id","der")
    navPk.appendChild(buttonLeft)
    navPk.appendChild(buttonRight)
}

//Cargamos os botones e os 25 primeiros pokemones
document.addEventListener("DOMContentLoaded", buttons)
document.addEventListener("DOMContentLoaded", mostrarPokemones())

//Engadimos envento no nav para pasar de páxina.
navPk.addEventListener("click", e =>{
    
    if(e.target.id == "izq"){
        if(numIni != 1 && numFin != 25){
            pokemonContainer.innerHTML=""
            numIni-=25
            numFin-=25
            pokemonContainer.innerHTML=""
            e.addEventListener("change", mostrarPokemones(numIni,numFin))
        }else{
            alert("Non hai pokemons")
        }
    }else if(e.target.id =="der"){
        pokemonContainer.innerHTML=""
        numIni+=25
        numFin+=25
        e.addEventListener("change", mostrarPokemones(numIni, numFin))
    }
})



