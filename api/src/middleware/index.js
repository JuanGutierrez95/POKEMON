const validateCreatePokemon = (req, res, next) => {
    const { name, hp, attack, speed, defense, height, weight, types} = req.body;
    if(!name) return res.status(404).send({error: "The name is missing"});
    if(!hp) return res.status(404).send({error: "The hp is missing"}) 
    if(!attack) return res.status(404).send({error: "The attack is missing"})
    if(!speed) return res.status(404).send({error: "The speed is missing"})
    if(!defense) return res.status(404).send({error: "The defense is missing"})
    if(!height) return res.status(404).send({error: "The height is missing"})
    if(!weight) return res.status(404).send({error: "The weight is missing"}) 
    if(!types) return res.status(404).send({error: "The types is missing"})    
    next()
} 

module.exports = {
    validateCreatePokemon,
}