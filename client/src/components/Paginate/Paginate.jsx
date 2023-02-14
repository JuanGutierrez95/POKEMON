import React from 'react'
import styles from './Paginate.module.css'

/****************LOGIC PAGINATE**************/
const Paginate = ({allPokemons, pokemonsPerPage,  paginado}) => {
  const pageNumbers = []
  for(let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
    pageNumbers.push(i)
  }

/*Este number es cada una de las paginas que yo necesito para renderizar todos mis pokemones  */
  /*RENDERIZAR EL COMPONENT PAGINATE*/
  return (
    <nav className={styles.paginate} >
        { pageNumbers && pageNumbers.map((number) => { 
          return( 
          <div key={number} className={styles.item} >
          <button className={styles.btn} onClick={() => paginado(number)}>{number}</button>
          </div>
        )})}
    </nav>
  )
}

export default Paginate