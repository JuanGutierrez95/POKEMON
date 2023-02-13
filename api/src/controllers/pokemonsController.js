const { getAllPokemons } = require("../utils/info")
const { Pokemon, Type } = require("../db");
//async await = Es simular un momento de sincronia dentro de la naturaleza asincronica que tiene node. Una funcion async me devuelve una promesa 
//promesa usando .then = la funcion se va a ejecutar cuando la promesa se resuelva, pero mientras tanto la ejecucion va a continuar 

//query: el query se pasa por el url
const getPokemons = async ( req, res )=>{ //el async trabaja de manera asincrona
    const { name } = req.query;
    const pokemonsAll = await getAllPokemons();
    if( name ){
        const pokemonName = pokemonsAll.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));
        pokemonName.length ? res.status(200).json(pokemonName) : res.status(404).send(`Pokemon not found for ${name} `);
    }else{
        res.status(200).json(pokemonsAll);
    }
}
//res.send utiliza content-type:text/html
//res.json utiliza content-type:application/json
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
const getPokemon = async ( req, res ) =>{
    const { id } = req.params;
    const pokemonsAll = await getAllPokemons();
    if( id ){
        const pokemonId = pokemonsAll.filter((p) => p.id == id);
        pokemonId.length ? res.status(200).json(pokemonId) : res.status(404).send(`Pokemon not found for ${id}`)
    }
}


//body: el body se pasa por los datos que creamos.
//create
const createPokemon = async ( req, res )=>{
    try {
        let { 
        name, hp, attack, defense, speed, height, weight, types, sprite, createdInDb} = req.body;
        let newPokemon = await Pokemon.create({
            name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
            hp,
            attack,
            speed, 
            defense,
            height,
            weight,
            sprite : sprite ? sprite : "https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/d7621acf3e5b732050acd51c2f16cdba/large.gif",
            createdInDb
        })
       let typesDb = await Type.findAll({
        where: { //La where opción se utiliza para filtrar la consulta
            name: types //dentro del modelo Type tengo que buscar los types que coincida con el types que le pasamos por body
          },         
        })
        newPokemon.addType(typesDb) //el add es un metodo de sequelize, basicamente lo que hace es traerme de la tabla de lo que le pasamos typesDb
        ? res.status(200).send('El Pokemon ha sido creado con éxito') : res.status(404).send({error: 'El Pokemon no ha sido creado con éxito'})
    } catch (error) {  
        console.log({error: error.message})
    } 
}




module.exports = {
    getPokemons,//objeto literal
    getPokemon, 
    createPokemon
}