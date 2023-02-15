import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { 
  getPokemons,
  getTypes, 
  filterPokemonsByType,
  filterCreated,
  orderByAlphabetico,
  orderByAttack,
  byReload
  } from '../../redux/actions' 
import Loading from '../../components/Loading/Loading'
import Card from '../../components/Card/Card' 
import Paginate from '../../components/Paginate/Paginate'
import SearchBar from '../../components/SearchBar/SearchBar'
import styles from './Home.module.css' 
import LogoPokemon from '../../images/LogoPokemon.jpg'
const Home = () => {
  

  const dispatch = useDispatch() 

  const allPokemons = useSelector((state) => state.pokemons); 
  const allTypes = useSelector((state) => state.types);
  const error = useSelector((state) => state.error);

  
  const [/*order*/, setOrder] = useState(""); 
  const [/*orden*/, setOrden ] = useState("")
  

  const [ currentPage, setCurrentPage ] = useState(1); 
  const [ pokemonsPerPage, /*setPokemonsPerPage*/ ] = useState(12); 
  const indexOfLastPokemon = currentPage * pokemonsPerPage 
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
  const currentPokemons =  allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  

  useEffect(() => {
    dispatch(getPokemons())
  },[dispatch]) 

  useEffect(() => {
    dispatch(getTypes())
  },[dispatch])

  



  const handleClick = (e) => {              
    e.preventDefault(); 
    dispatch(getPokemons())  
  }

  

  const handleFilterTypes = (e) => {  
    e.preventDefault()
    dispatch(filterPokemonsByType(e.target.value))
    setCurrentPage(1)


  } 


  const handleFilterCreated = (e) => {
    e.preventDefault()
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1)
  }



  const handleFilterAlphabetico = (e) => {
    e.preventDefault() 
    dispatch(orderByAlphabetico(e.target.value))
    setCurrentPage(1); 
    setOrder(`Ordenado ${e.target.value}`)  
  }

  const handleFilterAttack = (e) => {
    e.preventDefault()
    dispatch(orderByAttack(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }


  if(error.length > 0 && currentPokemons.length === 0 ){
    return (
      <div>
    <h1>{error[0].message}</h1>
    <button className={styles.homeButtons} onClick={e => {handleClick(e)}}> 
      Load All Pokemons
      </button>
      </div>
    ) 

  }
    return (
    <div className={styles.bgHome}>
      <div className={styles.maxBox}>
        <div>
      <Link to='/'>
      <img className={styles.logo} src={LogoPokemon} alt="LogoPokemon not found" />
      </Link>
        </div>
      <div className={styles.menuContainer} >
      <div id="menu">
        <ul>
          <Link className={styles.Link} to='/pokemonCreate'>
        <button className={styles.homeButtons} >  Create Pokemon  </button>
        </Link>
        
      <button className={styles.homeButtons} onClick={e => {handleClick(e)}}> 
      Load All Pokemons
      </button>
    
      <SearchBar />
        </ul>
      </div>
      
      <div className={styles.orderFilter}>
      <ul> 
      
      <li>
        <select onChange={e => handleFilterTypes(e)} > 
        <option className={styles.title} >Filter by Types</option>
        <option value='all'>Todos</option>
                {allTypes?.map((t) => {  return (
                  <option key={t.id} value={t.name} >{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</option>  
                  )})}            
        </select>
        </li>
        <li>
    
        <select onChange={e => handleFilterCreated(e)}>
          <option className={styles.title} >Filter by Existing or Created</option>
          <option value='all'>All</option>
          <option value='created'>Created</option>
          <option value='api'>Existing</option>
        </select>
        </li>
    
        <li>
        <select onChange={e => handleFilterAlphabetico(e)}> 
          <option className={styles.title} >Alphabetical Order</option>
          <option value='asc'>A-Z</option>
          <option value='desc'>Z-A</option>
        </select>
        </li>
  
      <li>
        <select onChange={e => handleFilterAttack(e)} >
          <option className={styles.title} >Attack Order</option>
          <option value='strong' >Stronger attack</option>
          <option value='weak' >Weaker attack</option>
        </select>        
      </li>
      </ul>
                  </div>
                  </div>
                  </div>
  
        <div className={styles.gridContainer}>
  {currentPokemons.length === 0 && error.length !== 0 ? (
      <Loading />
  ) : (
    currentPokemons?.map((p) => {
      return (
        <Card 
          id={p.id}
          key={p.id} 
          name={p.name}
          sprite={p.sprite} 
          types={p.types.map((el, index) => el.name.charAt(0).toUpperCase() + el.name.slice(1) + (index === p.types.length - 1 ? '' : ', '))}
        />
      );
    })
  )}
</div> 
      
  
          <Paginate
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
          /> 
      
          
        
    
      
 
    </div>
  )
}

export default Home