import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../../redux/actions'
import { useEffect } from 'react'
import Loading from '../../components/Loading/Loading'
import styles from './Detail.module.css'


const Detail = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const myPokemon = useSelector((state) => state.detail)                                                              //como me traigo el detalle? con el useSelector

  useEffect(() => {
    dispatch(getDetail(id))                                                                                         //de esta manera accedo al id de ese detalle
  },[dispatch, id])

  return (
    <div className={styles.container}>
      <Link to='/home' >
    <button className={styles.btn} >Volver</button>
    </Link>
      <div>
      {
        myPokemon.length > 0 ?
        <div className={styles.details} >
            <div className={styles.name} >
          <h3>{myPokemon[0].name}</h3>
          </div>
            <div className={styles.sprite}>
          <img src={myPokemon[0].sprite} alt="not found" width="350px" height="250px"/> 
          </div>
          <div className={styles.id} >
          <h4>ID: {myPokemon[0].id}</h4>
          </div>
            <div className={styles.hp}>
          <h4>Health Points: {myPokemon[0].hp}</h4>
    </div>
      <div className={styles.attack}>
          <h4>Attack: {myPokemon[0].hp}</h4>
    </div>
     <div className={styles.defense}>
          <h4>Defense: {myPokemon[0].defense}</h4>
         </div>
          
          <div className={styles.speed} >
          <h4>Speed: {myPokemon[0].speed}</h4>
          </div>
      <div className={styles.height} >
          <h4>Height: {myPokemon[0].height}</h4>
          </div>
        <div className={styles.weight} >
          <h4>Weight: {myPokemon[0].weight}</h4>
          </div>
            
          <div className={styles.types} >
    <h4>Types:{myPokemon[0].types.map((e) => " " +
    e.name.charAt(0).toUpperCase() + e.name.slice(1) + " " )} 
</h4>
    </div>
    
        </div>
        :    
        <Loading/>  
      } 
      
        </div>
      
    </div>
    )
}

export default Detail


//RAFCE