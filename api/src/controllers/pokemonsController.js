const { pokemonFromApi } = require("../utils/info")
const { Pokemon, Type } = require("../db");

//query
const getPokemons = async ( req, res )=>{
    res.status(200).send(await pokemonFromApi())
}
//async await = Es simular un momento de sincronia dentro de la naturaleza asincronica que tiene node. Una funcion async me devuelve una promesa 
//promesa usando .then = la funcion se va a ejecutar cuando la promesa se resuelva, pero mientras tanto la ejecucion va a continuar 



//params
const getPokemon = ( req, res ) =>{
    res.status(200).send('por id')
}



//body
const createPokemon = ( req, res )=>{
    res.status(200).send('por creado')
}

module.exports = {
    getPokemons,//objeto literal
    getPokemon,
    createPokemon
}