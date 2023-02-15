import React from 'react'

import poke from '../../GIFs/pokeball.gif'
import styles from "./Loading.module.css"




const Loading = () => {
  

  return (
    <div className={styles.container} >
        <div className={styles.loading} >
            <img
            src={poke}
            alt="Pokemon not found"
            width="570px"
            height="270px"
            />
        <h2 className={styles.text} > Loading...</h2>
      
        </div>
    </div>
  )
}
export default Loading