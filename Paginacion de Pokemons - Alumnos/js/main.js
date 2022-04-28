const pokemonContainer = document.querySelector(".pokemon-container")
const spinner = document.querySelector(".spinner-border")
const previous = document.querySelector(".prev")
const next = document.querySelector(".next")


let offset = 1
let limit = 8


previous.addEventListener('click', () => {
    if(offset != 1){
        offset -= 9;
        removeChildNodes(pokemonContainer)
        fetchPokemones(offset, limit)
    }else{
        alert("No hay más Pokemones")
    }
})

next.addEventListener('click', () => {
    removeChildNodes(pokemonContainer)
    offset += 9
    fetchPokemones(offset,limit)
})

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
        createPokemon(data)
        spinner.style.display = "none"
    })
}

function fetchPokemones(offset, limit){
    spinner.style.display = "block"
    for (let i = offset; i <= offset + limit; i++){
        fetchPokemon(i)
    }
}

function createPokemon(pokemon){
    const flipCard = document.createElement("div")
    flipCard.classList.add("flip-card")

    const cardContainer = document.createElement("div")
    cardContainer.classList.add("card-container")

    flipCard.appendChild(cardContainer)

    const card = document.createElement("div")
    card.classList.add("pokemon-block")
    
    const imgContainer = document.createElement("div")
    imgContainer.classList.add("img-container")

    const img = document.createElement("img")
    img.src = pokemon.sprites.front_default

    imgContainer.appendChild(img)

    const number = document.createElement("p")
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`

    const nombre = document.createElement("p")
    nombre.classList.add("name")
    nombre.textContent = pokemon.name

    card.appendChild(imgContainer)
    card.appendChild(number)
    card.appendChild(nombre)

    const cardBack = document.createElement('div')
    cardBack.classList.add('pokemon-block-back')
    cardBack.appendChild(progressBars(pokemon.stats))

    cardContainer.appendChild(card)   
    cardContainer.appendChild(cardBack)
    pokemonContainer.appendChild(flipCard)
    
}


function removeChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}


function progressBars(stats){
    const statsContainer = document.createElement('div')
    statsContainer.classList.add("stats-container")

    for ( let i = 0; i< 3; i++){
        const stat = stats[i]

        const statPercent = stat.base_stat + "%";

        const statContainer = document.createElement('div')
        statContainer.classList.add("stat-container")

        const statName = document.createElement('div')
        statName.textContent = stat.stat.name

        const progress = document.createElement('div')
        progress.classList.add('progress')

        const progressBar = document.createElement("div")
        progressBar.classList.add("progress-bar")
        progressBar.setAttribute("aria-valuemin","0")
        progressBar.setAttribute("aria-valuenow", stat.base_stat)
        progressBar.setAttribute("aria-valuemax", "200")
        progressBar.style.width = statPercent 
        progressBar.textContent = statPercent

        progress.appendChild(progressBar)
        statContainer.appendChild(statName)
        statContainer.appendChild(progress)
        statsContainer.appendChild(statContainer)

    }
    return statsContainer
}


fetchPokemones(offset,limit)

