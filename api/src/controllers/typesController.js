const {Type} = require("../db")
const axios = require("axios");
//const { getAllPokemons } = require("../utils/info");

const getTypes = async ( req, res ) => {
    const typeDb = await Type.findAll();
    if(!typeDb.length) {
        try {
            const types = await axios.get("https://pokeapi.co/api/v2/type"); //busco en la api los types
            const typesName = types.data.results.map(t => t.name); //nos traemos solo el nombre
            const typesCreate = typesName.map(async t => await Type.create({ name: t})); //creamos en la db los types solo con el name.  (findOrCreate({where: {name: t}}))
            const allTypes = await Type.findAll();
            res.status(200).send(allTypes); 
        } catch (error) {
            res.status(404).send({error: "error"});
        }; 
    } else {
        res.status(200).send(typeDb);
}
}
    module.exports = {
    getTypes
}
