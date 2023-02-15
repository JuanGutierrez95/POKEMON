import React from 'react';
import { useState, useEffect } from 'react';
import { postPokemon, getTypes } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from "./PokemonCreated.module.css"


const PokemonCreated = () => {
  /******DISPATCH*******/
  const dispatch = useDispatch()
  
  /*******HISTORY*************/
  const history = useHistory() //el historyPush es basicamente una funcion que lo que hace es redirigirme a la ruta que yo le diga 
  
  /******INITIALSTATE***************/
  const types = useSelector((state) => state.types) //Como em traigo el state? Me traigo los types
  
  /*********ERRORS**********************/
  const [errors, setErrors] = useState({})  //luego de la funcion validate, me genero un state local, que va ser un objeto vacio
  
  /*************USESTATE AND POSTPOKEMON********************/
  //Que voy a necesitar para crear mi personaje? que tiene que a ver? renderizo en la pagina? El formulario y ese formulario donde me lo voy a guardar? en un state
  const [ input, setInput] = useState({//le paso lo que necesita el post
    name: "",  
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    sprite: "",
    types: [],//lo seteo en un array, porque si lo seteo en string, no me va a dejar crear mas types
  })


  /******MANEJO DE CAMBIO INPUT***********************/
  const handleChange = (e) => { //va ir manejando cada vez que ccambiemos el input
    setInput({  //que tengo que ir cambiando? ir guardando las cosas que el usuario va escribiendo en el input, en mi state input.  A medida que yo voy escribiendo mi state input va recibiendo y va guardando, en e.target.name : e.target.value
    ...input,  //setea el state
      [e.target.name] : e.target.value //agrego e.target.value de lo que este modificando. El e.target.value va a tomar alguno de estos input name, hp, attack, speed etc y lo va a ir modificando dependiendo de lo que este escrito, le pasamos el handleChange a todos los inputs  
  })  
  /**********SETEEAME MY ERRORS PASANDO LA FUNCION VALIDATION**************/
    setErrors(validate({ //venimos del setErrors con el useState que empieza con un objeto vacio.   Seteeame mi setErrors pasandole la funcion validate
      ...input, //con el state input y 
      [e.target.name] : e.target.value // el e.target.name en el e.target.value
    }))
    console.log({input})
  }

  /******AGREGAMOS LO QUE VAMOS SELECCIONANDO Y CONCATENAMOS MIENTRAS SE VAN AGREGANDO A UN ARRAY, LO QUE SELECCIONAMOS******************/
  const handleSelect = (e) => {
    e.preventDefault()
    input.types.length < 2 && !input.types.includes(e.target.value) ? setInput({                                //en el estado que guardo todo
      ...input,
      types : [...input.types , e.target.value] //es un arreglo lo que ya habia le paso, traeme lo que ya habia y concatename con e.target.value. Es ir agregando en un arreglo lo que vaya seleccionando  
    }) : alert('Maximun two types')
}


  const handleSubmit = (e) => {
  e.preventDefault()
  setErrors(
    validate({
      ...input,
      [e.target.name] : e.target.value,
    })
  )
  if(!Object.values(errors).length && input.name && input.hp && input.attack && input.defense && input.speed && input.height && input.weight && input.sprite && input.types){
  dispatch(postPokemon(input))
  alert('Your pokemon has been successfully created')
  setInput({
    name: "",  
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    sprite: "",
    types: []
  })
}else{
  alert('Sorry, your pokemon has not been created successfully')
  return;
}
  history.push('/home')
}


  const handleDelete = (type) => {  //seteo el input
  setInput({
    ...input,  //traigo copia del input, que tiene lo todo lo del setInput ({name, hp, defense etc})
    types: input.types?.filter(t => t !== type ) //va a agarrar y me va a devolver el state nuevo sin eese elemento que yo clickee 
  })

}
  
/**********EXPRESION REGULAR*****************/
const isString = (name) => /^\d+$/.test(name) ? true : false;
const isNumber = (number) => /^\D+$/.test(number) ? true: false;


/**************VALIDATION WITH JAVASCRIPT***************/
//value coincide con lo que me traiga el back, para que se haga correctamente en insomnia postman.
// input name input hp etc. lo tengo que hacer matchear a los parametros de mi post
  const validate = (input) => {//input es mi estado local
  let errors = {}
  if(!input.name.trim()){ //si en mi state local no hay nada, entonces en mi
    errors.name = "A name is required"   //objeto voy a requerir un string
  }else if(isString(input.name)) errors.name = "Only the use of letters!";
  
  else if(!input.hp) errors.hp = 'Needs completing';
  else if(!isNumber(input.hp < 0 || input.hp > 500)) errors.hp = 'Only the use of numbers!';
  
  else if(!input.attack) errors.attack = 'Needs completing';
  else if(!isNumber(input.attack < 0 || input.attack > 500)) errors.attack = 'Only the use of numbers!';
  
  else if(!input.defense) errors.defense = 'Needs completing';
  else if(!isNumber(input.defense < 0 || input.defense > 500)) errors.defense = 'Only the use of numbers!';
  
  else if(!input.speed) errors.speed = 'Needs completing';
  else if(!isNumber(input.speed < 0 || input.speed > 500)) errors.speed = 'Only the use of numbers!';
  
  else if(!input.height) errors.height = 'Needs completing';
  else if(!isNumber(input.height < 0 || input.height > 100)) errors.height = 'Only the use of numbers!';
  
  else if(!input.weight) errors.weight = 'Needs completing';
  else if(!isNumber(input.weight < 0 || input.weight > 1000)) errors.weight = 'Only the use of numbers!';
  
  return errors;
}

useEffect(() => {
    dispatch(getTypes())
  }, [dispatch])

  return (
    <div className={styles.cont}>
      <h1 className={styles.h1} >Let's create a new Pokemon!</h1>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e) } >
        <div className={styles.inputCont} >
          <label>Name: </label>
          <input
          className={styles.input}
          type="text"
          value={input.name}
          name= "name"
          placeholder='Escribe aquí el nombre de tu Pokémon...'
          onChange={(e) => handleChange(e)}
          />
          {errors.name && (
            <p>{errors.name}</p>
          )}
        </div>
      
        <div className={styles.inputCont} >
          <label>Health Points: </label>
          <input
          className={styles.input}
          type="number"
          value={input.hp}
          name = "hp"
          placeholder='1 - 500'
          onChange={(e) => handleChange(e)}
          />
          {errors.hp && (
            <p>{errors.hp}</p>
          )}
          </div>
          <div className={styles.inputCont} >
            <label>Attack:</label>
            <input
            className={styles.input}
            type="number"
            value={input.attack}
            name = "attack"
            placeholder='1 - 500'
            onChange={(e) => handleChange(e)}
            />
            {errors.attack && (
            <p>{errors.attack}</p>
          )}
        </div>
        <div className={styles.inputCont} >
            <label>Defense:</label>
            <input
            className={styles.input}
            type="number"
            value={input.defense}
            name = "defense"
            placeholder='1 - 500'
            onChange={(e) => handleChange(e)}
            />
            {errors.defense && (
            <p>{errors.defense}</p>
          )}
        </div>
        <div className={styles.inputCont} >
          <label>Speed:</label>
          <input
          className={styles.input}
          type="number"
          value={input.speed}
          name = "speed"
          placeholder='1 - 500'
          onChange={(e) => handleChange(e)}
          />
          {errors.speed && (
            <p>{errors.speed}</p>
          )}
        </div>
        <div className={styles.inputCont} >
          <label>Height:</label>
          <input 
          className={styles.input}
          type="number"
          value={input.height}
          name = "height"
          placeholder='1 - 500'
          onChange={(e) => handleChange(e)}
          />
          {errors.height && (
            <p>{errors.height}</p>
          )}
        </div>
        <div className={styles.inputCont}>
          <label>Weight:</label>
          <input 
          className={styles.inputCont}
          type="number"
          value={input.weight}
          name ="weight"
          placeholder='1 - 1000'
          onChange={(e) => handleChange(e)}
          />
          {errors.weight && (
            <p>{errors.weight}</p>
          )}
        </div>
        <div className={styles.inputCont} >
          <label>Image:</label>
          <input 
          className={styles.input}
          type="url"
          value={input.sprite}
          name="sprite"
          placeholder='Url image'
          onChange={(e) => handleChange(e)}
          />
          {errors.sprite && (
            <p>{errors.sprite}</p>
          )}
        </div>  
        <div>
          <label>Types:</label>
          <select onChange={(e) => handleSelect(e)} 
          name="types"
          id="types"
          required>
          {
          types?.map((p) => {
            return (
            <option value={p.name} key={p.id}>{p.name}</option>)
            })
            }
            </select>
            </div>
      <div className={styles.deleteType}>
      {input.types.map((e, index) => { /*input es mi state local, el state local va a tener todos mis types que voy seleccionando */
        return(
          <div className={styles.type}  key={index} >
          <p className={styles.Ptype}>{e}</p>
          <button className={styles.btn} onClick={() => handleDelete(e)} >X</button>
        </div>
          )
        })}
        </div>
<br/>

        <div className={styles.footer}> 
    <button className={styles.btn} type='submit'>Crear Pokemon</button>
    <button className={styles.btn} onClick={() => history.push('/home')}>Volver</button>
        </div>
      </form>
    </div>
  )
}

export default PokemonCreated