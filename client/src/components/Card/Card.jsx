import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Card.module.css"

/*CARD: RENDERIZA LO QUE NECESITO*/
const Card = ({id, name, sprite, types}) => {
    return(
        <div className={styles.card} >
              <Link className={styles.lk} to={`/pokemonDetail/${id}`}>
            <h3 className={styles.name}>{name}</h3>
            <img src={sprite} alt="img not found" widht="120px" height="120px" />
            <h4 className={styles.types} >{types}</h4>
        </Link>
        </div>
    )
}

export default Card