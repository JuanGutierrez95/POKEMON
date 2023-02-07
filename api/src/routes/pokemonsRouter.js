const { Router } = require("express");

const pokemonsRouter = Router();

const {
    getPokemons,
    getPokemon,
    createPokemon
} = require('../controllers/pokemonsController');


//const { validatePokemon } = require("../middleware");

pokemonsRouter.get('/', getPokemons )
pokemonsRouter.get('/:id', getPokemon )
pokemonsRouter.post('/', createPokemon )  //De esta forma protegemos nuestro controlador de una request que esta mal. Si la request esta mal, que no llegue al  controlador  
//el controlador es el que maneja el endpoint 

module.exports = pokemonsRouter;