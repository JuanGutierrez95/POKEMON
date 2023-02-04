const { getAllPokemons } = require("../utils/info")
const { Pokemon, Type } = require("../db");
//async await = Es simular un momento de sincronia dentro de la naturaleza asincronica que tiene node. Una funcion async me devuelve una promesa 
//promesa usando .then = la funcion se va a ejecutar cuando la promesa se resuelva, pero mientras tanto la ejecucion va a continuar 

//query
const getPokemons = async ( req, res )=>{

}
/*
findPokemons() es hacer una busqueda. y el getAllPokemons
const getPokemons = async (req, res) => {
    const {name} = req.query;
    const findPokemons = () => {};
    let results = name ? findPokemons() : await getAllPokemons();
    res.status(200).json(results);
}
*/


//params
//getPokemon es traerme un determinado ID
const getPokemon = ( req, res ) =>{
    
}


//body
//create
const createPokemon = ( req, res )=>{
    
}

module.exports = {
    getPokemons,//objeto literal
    getPokemon,
    createPokemon
}