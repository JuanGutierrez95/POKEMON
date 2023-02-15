import React from 'react';
import { useState, useEffect } from 'react';
import { postPokemon, getTypes } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from "./PokemonCreated.module.css"


const PokemonCreated = () => {

  const dispatch = useDispatch()
  

  const history = useHistory() 
  

  const types = useSelector((state) => state.types) 
  
  
  const [errors, setErrors] = useState({})  
  
  
  const [ input, setInput] = useState({
    name: "",  
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    sprite: "",
    types: [],
  })



  const handleChange = (e) => { 
    setInput({
    ...input,  
      [e.target.name] : e.target.value
  })  

    setErrors(validate({ 
      ...input, 
      [e.target.name] : e.target.value 
    }))
    console.log({input})
  }

  const handleSelect = (e) => {
    e.preventDefault()
    input.types.length < 2 && !input.types.includes(e.target.value) ? setInput({                              
      ...input,
      types : [...input.types , e.target.value] 
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


  const handleDelete = (type) => {  
  setInput({
    ...input,  
    types: input.types?.filter(t => t !== type ) 
  })

}
  

const isString = (name) => /^\d+$/.test(name) ? true : false;
const isNumber = (number) => /^\D+$/.test(number) ? true: false;





  const validate = (input) => {
  let errors = {}
  if(!input.name.trim()){ 
    errors.name = "A name is required"   
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

  <div className={styles.inputCont}>
          <label>Weight:</label>
          <input 
          className={styles.input}
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
        <div className={styles.typ} >
          <label>Types: </label>
          
          <select onChange={(e) => handleSelect(e)} 
          
          className={styles.ty}
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
      {input.types.map((e, index) => { 
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