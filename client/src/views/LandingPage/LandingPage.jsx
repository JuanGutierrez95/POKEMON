import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./LandingPage.module.css"
import logoPokemon from "../../images/LogoPokemon.jpg"


const LandingPage = () => {
  return (
    <div className={styles.background}>
        <div className={styles.logo}>
            <img className={styles.landing} src={logoPokemon} alt='PokemonImage not found'></img>
        </div>
        <div className={styles.container}>
        <Link className={styles.link} to={"/home"} >
        <button className={styles.button}>START PAGE</button>
        </Link>
        </div>
        </div>
  )
}

export default LandingPage