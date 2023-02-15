import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { byReload, getDetail } from '../../redux/actions'
import { useEffect } from 'react'
import Loading from '../../components/Loading/Loading'
import styles from './Detail.module.css'


const Detail = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const myPokemon = useSelector((state) => state.detail)
                                                

  useEffect(() => {
    dispatch(getDetail(id))                                                                                         
  },[dispatch, id])

  useEffect(() => {
    dispatch(byReload(id))
  }, [dispatch, id])

  return (
    <div className={styles.container}>
      <Link to='/home' >
    <button className={styles.btn} >Volver</button>
    </Link>
      <div>
      {
        myPokemon ?
        <div className={styles.details}>
            <div className={styles.name}>
              <h3>{myPokemon.name}</h3>
          </div>
            <div className={styles.sprite}>
          <img src={myPokemon.sprite} alt="not found" width="350px" height="250px"/> 
          </div>
          
          <div className={styles.id} >
          <h4>ID: {myPokemon.id}</h4>
          </div>
            <div className={styles.hp}>
          <h4>Health Points: {myPokemon.hp}</h4>
    </div>
      <div className={styles.attack}>
          <h4>Attack: {myPokemon.hp}</h4>
    </div>
     <div className={styles.defense}>
          <h4>Defense: {myPokemon.defense}</h4>
         </div>
          
          <div className={styles.speed} >
          <h4>Speed: {myPokemon.speed}</h4>
          </div>
      <div className={styles.height} >
          <h4>Height: {myPokemon.height}</h4>
          </div>
        <div className={styles.weight} >
          <h4>Weight: {myPokemon.weight}</h4>
          </div>
            
          <div className={styles.types} >
    <h4>Types:{myPokemon?.types?.map((e) => " " + e.name.charAt(0).toUpperCase() + e.name.slice(1) + " " )} 
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
