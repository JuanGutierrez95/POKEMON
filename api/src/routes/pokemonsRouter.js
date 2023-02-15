const { Router } = require("express");

const pokemonsRouter = Router();

const {
    getPokemons,
    getPokemon,
    createPokemon,
    
} = require('../controllers/pokemonsController');


const { validateCreatePokemon } = require("../middleware");

pokemonsRouter.get('/', getPokemons )
pokemonsRouter.get('/:id', getPokemon )
pokemonsRouter.post('/', validateCreatePokemon, createPokemon )



module.exports = pokemonsRouter;