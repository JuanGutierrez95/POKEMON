import React from 'react'
import styles from './Paginate.module.css'


const Paginate = ({allPokemons, pokemonsPerPage,  paginado}) => {
  const pageNumbers = []
  for(let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
    pageNumbers.push(i)
  }


  return (
    <div className={styles.paginate} >
        { pageNumbers && pageNumbers.map((number) => { 
          return( 
          <div key={number} className={styles.item} >
          <button className={styles.btn} onClick={() => paginado(number)}>{number}</button>
          </div>
        )})}
    </div>
  )
}

export default Paginate