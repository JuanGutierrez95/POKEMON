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
    } 
    from "../actions/actionsTypes"
//EL REDUCER DEBE SER SIEMPRE UNA FUNCION PURA


//si no le estoy pasando el reducer un state xq no tengo, que tome por defecto el primer state yo lo voy a escribir, de ahi en adelante ya tendremos un state que podremos trabajar.
const initialState = {
    pokemons : [],
    allPokemons: [], //una copia de traer los pokemons
    detail: [],
    types: []
}
//el reducer es el unico que puede modificar el state global
const rootReducer = ( state = initialState, action ) => {
    switch(action.type) { //Switch: ante un pedido, hago uno u otro, cuando no se cumple ninguno tenemos default
        case GET_POKEMONS:  //I
            return{
                ...state,
                pokemons: action.payload, // en pokemons que es un array vacio, manda todo lo que te mandre GET_POKEMONS
                allPokemons: action.payload//añado todos los pokemons en allPokemons
            }
            case GET_NAME_POKEMONS: //VII
                return{//pokemons porque es el arreglo que estamos renderizando. siemore voy a trabajar sobre lo que estoy renderizando, el search es un filtrado que lo hicimos en el backend
                    ...state,
                    pokemons: action.payload
                }

            case GET_DETAIL:    
            return {
                    ...state, //lo ponemos en un nuevo state,en un array vacio detail[]
                    detail: action.payload
                
                }

                case POST_POKEMON:
                    return {
                        ...state //devolveme como esta, porque voy a crear en  otra nueva  ruta
                    }

                    case GET_TYPES: //V
                return{
                    ...state, //hacemos una copia, y a la copia cambiamos esa parte, siempre un cambio en el state global implica hacer una copia que va a tener una referencia, para vamos a retornar un objeto nuevo.   Pero no modificamos el state global. 
                    types: action.payload
                }

            case FILTER_POKEMONS_BY_TYPE: //II
                const allPokemons = state.allPokemons;
                const typeFiltered = action.payload === "all" ? allPokemons :
                allPokemons.filter( p => p.types.map( p => p.name ).includes( action.payload ))
                console.log(typeFiltered, 'soy el filter_by_type');
                return{
                    ...state,
                    pokemons: typeFiltered
                }
            /*case FILTER_BY_TYPE: // II
              const allPokemons = state.allPokemons
                const typesFiltered = action.payload === "all" ? allPokemons : allPokemons.filter(el => el.types === action.payload ) 
                return {
                ...state, //me traigo el state completo
                pokemons: typesFiltered //hacemos concatenacion pokemons and types
            
            }*/
            case FILTER_CREATED: //III
                const allPoke = state.allPokemons
                const createdFilter = action.payload === 'created' ?
                allPoke.filter(e => e.createdInDb)
                  : allPoke.filter(e => !e.createdInDb)
                  console.log('Creado por db', createdFilter.length)  
            return{
                ...state, //devuelve un copia del estado, en la que modificamos en la parte que nos interesa.
                pokemons: action.payload === "all" ? allPoke : createdFilter
            }
            case ORDER_BY_ALPHABETICO: //IV
                let sortedArr = action.payload === 'asc' ? 
                state.pokemons.sort(function(a, b){ //accedemos al state.pokemons que es el que se esta renderizando 
                    //el sort compara dos valores
                    if(a.name > b.name){ 
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0; //devuelve igual
            }) :
            //ejecuto 2 sort y ordenar de menor a mayor o mayor a menor
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
                pokemons: sortedArr //ahora vamos a dispatchear al home
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
                default: //sin default el primer state no se toma bien
            return state;
    }
}
    
export default rootReducer