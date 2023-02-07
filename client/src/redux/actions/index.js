import axios from "axios";
import { GET_POKEMONS } from "./actionsTypes";

//El redux thunk sirve para trabajar la llamada asincrona 

export const getPokemons = () => {
    return async function(dispatch) {
        let json = await axios.get("http://localhost:3001/pokemons")//le paso la url que me cree en la ruta en la base de datos
        return dispatch({
            type: GET_POKEMONS,
            payload: json.data
        })
    }
} //Luego vamos al reducer