
const axios = require( "axios" );
const { Pokemon, Type } = require("../db");


const getApiPokemons = async () => {
    try {
        const firstPage = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=226") 
    const secondPage = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=226&limit=225")  
    const linkTotal = firstPage.data.results.concat(secondPage.data.results)
    const infoApi = linkTotal.map((pokemon) => axios.get(pokemon.url))
    let infoPokemons = Promise.all(infoApi).then((url) => { 
        let info = [] 
        url.map((p) => {
            info.push({
                id: p.data.id,
                name: p.data.name.charAt(0).toUpperCase() + p.data.name.slice(1),
                hp: p.data.stats.find(h => h.stat.name === "hp").base_stat,    
                attack: p.data.stats.find(a => a.stat.name === "attack").base_stat,
                defense: p.data.stats.find(d => d.stat.name === "defense").base_stat,
                speed: p.data.stats.find(s => s.stat.name === "speed").base_stat,
                height: p.data.height, 
                weight: p.data.weight,
                sprite: p.data.sprites.other.dream_world.front_default,
                types: p.data.types.length < 2 ? [{name: p.data.types[0].type.name}] : [{name: p.data.types[0].type.name}, {name: p.data.types[1].type.name}],
            })
        })
        return info;
    })
    return infoPokemons;
    } catch (error) {
        console.log({error: error.message})
    }
}



const getDbPokemons = async () => {
    try {
        const dbPokemons = await Pokemon.findAll({// 
            include: {
                model: Type, 
                attributes: ['name'], 
                through: { 
                    attributes: [],
                }
            } 
    })
    //obtener todos los pokemons de la base de datos + sanitizar
    //Limpia todo y me devuelve un array con los datos que queremos
    /*const dbPokemonsClean = dbPokemons.map((pokemon) => {
        return {
            id: pokemon.id,
            hp: pokemon.hp,
            attack: pokemon.attack,
            defense: pokemon.defense,
            speed: pokemon.speed,
            height: pokemon.height,
            weight: pokemon.weight,
            image: pokemon.image,
            types: pokemon.types,
            origin: "db"
        }
    })
    return dbPokemonsClean;*/ 
    return dbPokemons;
    } catch (error) {
        console.log({error: error.message})
    }

}


const getAllPokemons = async ()=>{ 
    try {
        const apiPokemons = await getApiPokemons();
        const dbPokemons = await getDbPokemons(); 
        return [...apiPokemons, ...dbPokemons]; 
    } catch (error) {
        console.log({error: error.message})
    }
}

module.exports = {
    getApiPokemons,
    getDbPokemons,
    getAllPokemons,
}