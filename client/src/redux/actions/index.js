import axios from "axios";
import { 
    GET_POKEMONS, 
    GET_NAME_POKEMONS, 
    GET_DETAIL,
    GET_TYPES,
    FILTER_POKEMONS_BY_TYPE,
    FILTER_CREATED, 
    ORDER_BY_ALPHABETICO,
    ORDER_BY_ATTACK,
    
    } from "./actionsTypes";

//El redux thunk sirve para trabajar la llamada asincrona 

 
//I
export const getPokemons = () => { //I
    return async function(dispatch) {
        let json = await axios.get("http://localhost:3001/pokemons")//le paso la url que me cree en la ruta en la base de datos
        return dispatch({
            type: GET_POKEMONS, //es el papel que le dice a reducer que tiene que hacer
            payload: json.data
        })
    }
} //Luego vamos al reducer

//VII
export const getNamePokemons = (name) => {
    return async function(dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/pokemons?name=${name}`)//json.data: que devuelva la ruta una vez que yo le asigne en name
            return dispatch({
                type: GET_NAME_POKEMONS,
                payload: json.data//me va a devolver la accion, cuando ponemos en la barra de busqueda me va a devolver el name. o
            })
        } catch (error) {
            console.log({error: error.message})
        }
    }
}
//IX
export const getDetail = (id) => {
    return async function(dispatch){
        try {
            let json = await axios.get("http://localhost:3001/pokemons/"+id)
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        } catch (error) {
            console.log({error: error.message})
        }
    }
}
//VIII
export const postPokemon = (payload) => {
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/pokemons", payload) //el actions post, dispara una ruta post lo que quiero es crear el personaje,    
        console.log({response})
        return response
    }
}

//V
export const getTypes = () => {
    return async function(dispatch){ //que es dispatch? es dispatchear la instruccion get_types al reducer, para que el reducer lo reciba, lo lea vea que tenga que hacer y lo haga. Modifica el state global y esta modificacion de state global va a impactar en todos los componentes que esten suscriptos a este state global.    
        let json = await axios.get("http://localhost:3001/types")
        return dispatch({
            type: GET_TYPES,
            payload: json.data //con dispatch le damos una infomracion extra para que cambie
        })
    }
}

// II
export const filterPokemonsByType = (payload) => { //lo que llega de payload es basicamente desde el componente
    return {
        type: FILTER_POKEMONS_BY_TYPE,
        payload
    }
}

//III
export const filterCreated = (payload) => { //payload es la opcion que queremos renderizar
    return{
        type: FILTER_CREATED,
        payload
    }
}

//IV
export const orderByAlphabetico = (payload) => {
    return{
        type: ORDER_BY_ALPHABETICO,
        payload
    }
}

//VI
export const orderByAttack = (payload) => {
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}



