//TODA LA INFO DE LA API
const axios = require( "axios" );


//Listado de los pokemones desde pokeapi
//usar async await
//retornar los datos necesarios
//un mapeo de los datos que nos piden
//en la api nos traen 20 en una pagina * 2

const pokemonFromApi = async () => {
    const firstPage = await axios.get("https://pokeapi.co/api/v2/pokemon")
    const secondPage = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")
    const linkTotal = firstPage.data.results.concat(secondPage.data.results) 
    const infoApi = linkTotal.map((pokemon) => axios.get(pokemon.url))
    let infoPokemons = Promise.all(infoApi).then((url) => {
        let info = []
        url.map((p) => {
            info.push({
                id: p.data.id,
                name: p.data.name.charAt(0).toUpperCase() + p.data.name.slice(1),
                hp: p.data.stats.find(h => h.stat.name === "hp").base_stat,    //cuando hay un array. usamos los metodos de array para buscar algo en especifico
                attack: p.data.stats.find(a => a.stat.name === "attack").base_stat,
                defense: p.data.stats.find(d => d.stat.name === "defense").base_stat,
                speed: p.data.stats.find(s => s.stat.name === "speed").base_stat,
                height: p.data.height,
                weight: p.data.weight,
                types: p.data.types.map((t) => (t = {
                    name: t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
                })),
                image: p.data.sprites.other.dream_world.front_default,
            })
        })
        return info;
    })
    return infoPokemons;
}

//25:20


module.exports = {
    pokemonFromApi
}