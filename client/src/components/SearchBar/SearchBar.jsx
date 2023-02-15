import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../../redux/actions';
import styles from './SearchBar.module.css';

const SearchBar = () => {

const dispatch = useDispatch();

const [name, setName] = useState("")

const handleInputChange = (e) => {
  e.preventDefault()
  setName(e.target.value)
}

const handleSubmit = (e) => {
  e.preventDefault()
  if(!name.length){
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