import {
    GET_POKEMONS, 
    GET_NAME_POKEMONS, 
    GET_DETAIL, 
    POST_POKEMON, 
    GET_TYPES,
    FILTER_POKEMONS_BY_TYPE,
    FILTER_CREATED,
    ORDER_BY_ALPHABETICO,
    ORDER_BY_ATTACK,
    BY_RELOAD,
    } 
    from "../actions/actionsTypes"




const initialState = {
    pokemons : [],
    allPokemons: [],
    detail: {},
    types: [],
    error: [],

}

const rootReducer = ( state = initialState, action ) => {
    switch(action.type) { 
        case GET_POKEMONS: 
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            
            }
            case GET_NAME_POKEMONS: 
            if (action.payload.length === 0) {
                return {
                  ...state,
                  pokemons: action.payload,
                  error: [{ message: "Not matches found" }],
                };
              } else {
                return {
                  ...state,
                  pokemons: action.payload,
                  error: [],
                };
              }
              case BY_RELOAD:
                return {
                    ...state,
                    detail: action.payload
                }

            case GET_DETAIL:    
            return {
                    ...state, 
                    detail: action.payload
                
                }

                case POST_POKEMON:
                    return {
                        ...state 
                    }

                    case GET_TYPES: 
                return{
                    ...state,
                    types: action.payload
                }

            case FILTER_POKEMONS_BY_TYPE: 
                const allPokemons = state.allPokemons;
                const filterPokemons = allPokemons.filter( p => p.types.map( p => p.name ).includes( action.payload ))
                const typeFiltered = action.payload === "all" ? allPokemons : filterPokemons 
                return{
                    ...state,
                    pokemons: typeFiltered,
                    error : typeFiltered.length === 0 && [{message: "Not found by type"}]
                }
            case FILTER_CREATED: 
                const allPoke = state.allPokemons
                const createdFilter = action.payload === 'created' ?
                allPoke.filter(e => e.createdInDb)
                  : allPoke.filter(e => !e.createdInDb)
                  console.log('Creado por db', createdFilter.length)  
            return{
                ...state, 
                pokemons: action.payload === "all" ? allPoke : createdFilter
            }
            case ORDER_BY_ALPHABETICO:
                let sortedArr = action.payload === 'asc' ? 
                state.pokemons.sort(function(a, b){ 
                    
                    if(a.name > b.name){ 
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0; 
            }) :
            
            state.pokemons.sort(function(a, b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                pokemons: sortedArr 
            }
            //VI
            case ORDER_BY_ATTACK : 
            let sortAtt = action.payload === "strong" ?
            state.pokemons.sort(function(a, b){
                if(a.attack > b.attack){
                    return -1
                }
                if(b.attack > a.attack){
                    return 1
                }
                return 0
            }) :
            state.pokemons.sort(function(a, b){
                if(a.attack > b.attack){
                    return 1;
                }
                if(b.attack > a.attack){
                    return -1
                }
                return 0;
            })
            return{
                ...state,
                pokemons: sortAtt
            }
        
                default: 
            return state;
    }
}
    
export default rootReducer