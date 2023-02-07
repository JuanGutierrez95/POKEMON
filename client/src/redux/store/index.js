//el store de redux va a neceisat que me indique cual es su reducer
import { createStore, applyMiddleware, compose } from "redux"; //para poder decirle al store que usemos el thunkMiddleware, necesitamos el applyMiddleware
import rootReducer from "../reducer";
import thunkMiddleware from "redux-thunk";    //thunkMiddleware se encarga de todo esto.  Ejecutar la funcion, que hace la peticion, que vamos agregar, el dispatchear, el ayudante. Ese ayudante es thunkMiddleware 

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//el redux devtools es un compose
const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))//en algun lugar le tengo que decir al store vos tenees que usar el thunkMiddleware
    );   

//enhancer es un mejorador 

export default store;


//REACT ES UN MUNDO, 
//REDUX ES OTRO MUNDO.
//REDUX Y REACT SE ENCUENTRAN A TRAVES DEL PROVIDER