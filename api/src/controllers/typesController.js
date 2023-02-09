const {Type} = require("../db")
const axios = require("axios");
const { getAllPokemons } = require("../utils/info");
 

const getTypes = async ( req, res ) => {
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

/*
let typesApi = await axios.get(`https://pokeapi.co/api/v2/type`);
    let typesName = typesApi.data.results.map(t => t.name);
    for(let i = 0; i < typesName.length; i++) {
        Type.findOrCreate({
            where: {name: typesName[i]}
        })
    }
    const allTypes = await Type.findAll(
       
    )
    res.status(200).send(allTypes)
*/


/*

 */

/*const apiUrlTypes = await axios.get('https://pokeapi.co/api/v2/type') //accedo al endpoint de type que me da la Api
    const types = apiUrlTypes.data.results.map(el => el.name)             //me guardo el nombre de de c/tipo en el array types
    types.forEach(t => {                                  //recorro el array y por c/elm creo una entrada en la db Tipo
        Type.findOrCreate({         //.findOrCreate() si encuentra el tipo, lo muestra en la db y si no, lo crea en la db. Si uso .create() cada vez que haga una peticion me creará los 20 tipos.Metodos de sequelize
            where: {
                name: t,
            }
        })
    });

    const allTypes = await Type.findAll();  //guardo todo lo que haya en la db Tipo (nombre + id de c/tipo).
    res.status(200).send(allTypes);  //devuelvo solo la info de la db. Con esto me evito recorrer la api en cada peticion
*/

    module.exports = {
    getTypes
}