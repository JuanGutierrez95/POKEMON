const { getAllPokemons } = require("../utils/info")
const { Pokemon, Type } = require("../db");

const getPokemons = async ( req, res )=>{ 
    const { name } = req.query;
    const pokemonsAll = await getAllPokemons();
    if( name ){
        const pokemonName = pokemonsAll.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));
        pokemonName.length > 0 ? res.status(200).json(pokemonName) : res.status(200).send([]);
    }else{
        res.status(200).json(pokemonsAll);
    }
}

const getPokemon = async ( req, res ) =>{
    const { id } = req.params;
    const pokemonsAll = await getAllPokemons();
    if( id ){
        const pokemonId = pokemonsAll.find((p) => p.id == id);
        pokemonId ? res.status(200).json(pokemonId) : res.status(404).send(`Pokemon not found for ${id}`)
    }
}



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
        where: { 
            name: types 
          },         
        })
        newPokemon.addType(typesDb) 
        ? res.status(200).send('El Pokemon ha sido creado con éxito') : res.status(404).send({error: 'El Pokemon no ha sido creado con éxito'})
    } catch (error) {  
        console.log({error: error.message})
    } 
}





module.exports = {
    getPokemons,
    getPokemon, 
    createPokemon,
    
}