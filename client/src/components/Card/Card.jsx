import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Card.module.css"


const Card = ({id, name, sprite, types}) => {
    return(
        <div className={styles.card} >
              <Link className={styles.lk} to={`/pokemonDetail/${id}`}>
            <h2 className={styles.name}>{name}</h2>
            <br/>
            <img src={sprite} alt="img not found" widht="150px" height="150px" />
            <br/>
            <h3 className={styles.types} >{types}</h3>
        </Link>    
        </div>
    )
}

export default Card