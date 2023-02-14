import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../../redux/actions';
import styles from './SearchBar.module.css';

const SearchBar = () => {

const dispatch = useDispatch();

/***********STATE LOCAL*********/
const [name, setName] = useState("")//state local

/******INPUT CHANGE******/
const handleInputChange = (e) => {
  e.preventDefault()
  setName(e.target.value) //el value del input va a tomar el value del useState.  
//  console.log({name})
}

/*******SUBMIT********/
const handleSubmit = (e) => {
  e.preventDefault()
  if(!name.length){ //dispatcho la accion, que hace name va ser mi state local, voy a ir guardando lo que esta typeando el usuario en mi state local name. Lo que yo tengo en mi state local de repente va a llegar despues a mi accion que va a llamar al back, que es? lo que esta escribiendo el usuarip 
    alert("Please enter a pokemon")
  }else{
  dispatch(getNamePokemons(name))
  setName("")
  }
}

  return (
    <nav className={styles.searchBar} >
      <input 
      className={styles.searchBarInput}
      type = "text"
      value={name}
      placeholder= "Pokemon Name"
      onChange={(e) => handleInputChange(e)}
      />
      <button
      className={styles.searchBarButton}
      type='submit'
      onClick={(e) => handleSubmit(e)}
      >Search...</button>
    </nav>
  )
}

export default SearchBar