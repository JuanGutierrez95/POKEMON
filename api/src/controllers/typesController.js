const {Type} = require("../db")
const axios = require("axios")
 

const getTypes = async ( req, res ) => {
    //const typeNormal = await Type.findOne({where: {name:'normal'}});
    const typeDb = await Type.findAll();
    if(!typeDb.length) {
        try {
            const types = await axios.get("https://pokeapi.co/api/v2/type"); //busco en la api los types
            const typesName = types.data.results.map(t => t.name); //nos traemos solo el nombre
            const typesCreate = typesName.map(async t => await Type.create({ name: t })); //creamos en la db los types solo con el name.  (findOrCreate({where: {name: t}}))
            res.status(200).send(typesName); 
        } catch (error) {
            res.status(404).send('error');
        };
    } else {
        //const types = await Type.findAll();
        const typesName = typeDb.map(t => t.name); //regresa todo en otra variable
        return res.status(200).send(typesName);
}
}



module.exports = {
    getTypes
}