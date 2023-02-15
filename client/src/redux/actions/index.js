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
    BY_RELOAD,
    } from "./actionsTypes";

export const getPokemons = () => { 
    return async function(dispatch) {
        let json = await axios.get("http://localhost:3001/pokemons")
        return dispatch({
            type: GET_POKEMONS, 
            payload: json.data
        })
    }
} 

export const getNamePokemons = (name) => {
    return async function(dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            console.log(json.data)
            return dispatch({
                type: GET_NAME_POKEMONS,
                payload: json.data
                
            })
        } catch (error) {
            console.log({error: error.message})
        }
    }
}

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

export const postPokemon = (payload) => {
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/pokemons", payload) 
        return response
    }
}


export const getTypes = () => {
    return async function(dispatch){ 
        let json = await axios.get("http://localhost:3001/types")
        return dispatch({
            type: GET_TYPES,
            payload: json.data 
        })
    }
}




export const filterPokemonsByType = (payload) => { 
    return {
        type: FILTER_POKEMONS_BY_TYPE,
        payload
    }
}


export const filterCreated = (payload) => { 
    return{
        type: FILTER_CREATED,
        payload
    }
}


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

export const byReload = (payload) => {
    return {
        type: BY_RELOAD,
        payload
    }
}


