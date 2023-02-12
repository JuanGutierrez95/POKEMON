//TODA LA INFO DE LA API
const axios = require( "axios" );
const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize");

//Listado de los pokemones desde pokeapi
//usar async await
//retornar los datos necesarios
//un mapeo de los datos que nos piden
//en la api nos traen 20 en una pagina * 2

/* Esta Funcion es para obtener toda la info de la api Pokemon */
const getApiPokemons = async () => {
    try {
        const firstPage = await axios.get("https://pokeapi.co/api/v2/pokemon") //Es una promesa. Hago la consulta a la api Pokemon
    const secondPage = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")  // Promesa, Hago la segunda consulta a la api
    const linkTotal = firstPage.data.results.concat(secondPage.data.results) // concatenamos firstPage y secondPage para traernos los datos necesarios, el array de Pokemon lo tengo en un objeto, en ese objeto tenemos la propiedad data y results. La respuesta me viene en la data
    const infoApi = linkTotal.map((pokemon) => axios.get(pokemon.url)) //en la propiedad URL se encuentra los datos que preciso.
    let infoPokemons = Promise.all(infoApi).then((url) => { //Tenemos una promesa que lo estamos manejando con el .then correspondiente a la promesa. Promise.all recibimos cada respuesta de la url info
        let info = [] //creo un array de objects info y pusheo la informacion que necesito
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
/*Funcion nos trae los datos de pokemon desde la db*/

//findAll me retorna una promesa, yo espero a que se resuelve esta promesa para que entonces ese valor de resolucion se almacena en esta variable. El async no es el punto de partida
//Modularizamos
const getDbPokemons = async () => {
    try {
        const dbPokemons = await Pokemon.findAll({// 
            include: {/* Incluido el modelo Tipos y solo devolviendo el atributo de nombre. */
                model: Type, //traeme el Type
                attributes: ['name'], //traeme el name
                through: { //mediante los atributos
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

/* Concatenamos la funcion getApiPokemons y getDbPokemons */
const getAllPokemons = async ()=>{ //si es una funcion async, me retorna una promesa.
    try {
        const apiPokemons = await getApiPokemons();//me trae los pokemons de la api, a traves de esta funcion
        const dbPokemons = await getDbPokemons(); //me trae los pokemons de la base de datos, a traves de esta funcion
        return [...apiPokemons, ...dbPokemons]; //concatenamos dbPokemons y apiPokemons
    } catch (error) {
        console.log({error: error.message})
    }
}

module.exports = {
    getApiPokemons,
    getDbPokemons,
    getAllPokemons,
}