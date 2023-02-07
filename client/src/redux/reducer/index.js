import { GET_POKEMONS } from "../actions/actionsTypes"

const initialState = {
    pokemons : []
}

function rootReducer( state = initialState, action ) {
    switch(action.type) {
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: action.payload // en pokemons que es un array vacio, manda todo lo que te mandre GET_POKEMONS
            }
            default : 
    }
}

export default rootReducer