import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect} from 'react' //Importo los hooks que voy a usar de react
import { useDispatch, useSelector } from 'react-redux' //Importo las hooks de react-redux
import { 
  getPokemons,
  getTypes, 
  filterPokemonsByType,
  filterCreated,
  orderByAlphabetico,
  orderByAttack
  } from '../../redux/actions' //Importo las actions que me interesa usar en este componente Home
import Loading from '../../components/Loading/Loading'
import Card from '../../components/Card/Card' //Importo los componentes que voy a usar
import Paginate from '../../components/Paginate/Paginate'
import SearchBar from '../../components/SearchBar/SearchBar'
import styles from './Home.module.css' //Importo el style que quiero usar en este componente
import LogoPokemon from '../../images/LogoPokemon.jpg'
const Home = () => {
  
  /**********Dispatchear my actions***********/
  const dispatch = useDispatch() //es basicamente para utilizar la constante y dispatchear mis acciones
  //luego del reducer, nos importamos get_pokemons I
  
  /****************InitialState - Reducer****************/
  const allPokemons = useSelector((state) => state.pokemons)  //es lo mismo que hacer maptoStateProps.    Nos traemos del reducer los pokemons que empiezan en un array vacio 
  const allTypes = useSelector((state) => state.types)
  
  /********ORDER********/
  const [/*order*/, setOrder] = useState(""); //es un state local que empieza vacio
  const [/*orden*/, setOrden ] = useState("")
  
  /**************************PAGINATE************************/
  const [ currentPage, setCurrentPage ] = useState(1);  //guardo en la pagina actual, seteo la pagina actual. EMpieza en 1 porque siempre empieza por la primera pagina. Mi useState(1) inicial, mi pagina va ser 1
  const [ pokemonsPerPage, /*setPokemonsPerPage*/ ] = useState(12); //guardo cuantos pokemons quiero por pagina, seteo mis pokemons por pagina. Mi useState(12) lo que pide el reedme
  const indexOfLastPokemon = currentPage * pokemonsPerPage //  12
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage // 0
  const currentPokemons =  allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  // 1---------0---------12
  // 2---------13--------25
  // 3---------26--------38
  // 4---------39--------51
  
  /*******HELP RENDERIZADO*******/
  //me ayuda al renderizado
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
    console.log({pageNumber})
  }
  
  /**********State. When the component se monta */
  //traernos del state, los pokemons cuando el componente se monta Usamos useEffect
  useEffect(() => { //Esto es componentDidMount     I
    dispatch(getPokemons())
  },[dispatch]) //ARRAY DE DEPENDECIAS, SI TIENE UN ARRAY VACIO SE MONTA Y NO TERMINA

  useEffect(() => {
    dispatch(getTypes())
  },[dispatch])


  /********RELOAD my Pokemons********/
  const handleClick = (e) => {                //I
    e.preventDefault(); //para que no se me recargue la pagina, ponemos preventDefault para que no se me rompa las cosas
    dispatch(getPokemons())  //dispatcheo el getPokemons
  }

  /***********FILTERS TYPES AND FILTER CREATED*********/
//II
  const handleFilterTypes = (e) => {  //de reducer, venimos al home y usamos filterPokemonsByType  II
    e.preventDefault()
    dispatch(filterPokemonsByType(e.target.value))
    setCurrentPage(1)  
  }  // se va a ejecutar y va a tomar como payload el value de filtros, dependiendo el click que haga el usuario

// III
  const handleFilterCreated = (e) => {
    e.preventDefault()
    dispatch(filterCreated(e.target.value)) //lo que viene en el select, en el action es el payload
    setCurrentPage(1)
  }


  /********ORDER ALPHABETICO AND ATTACK**********/
//IV
  const handleFilterAlphabetico = (e) => {
    e.preventDefault() //e.preventDefault() se usa para prevenir el comportamiento por defecto de un evento y asegurarse de que sólo se realice la acción que se ha definido en el manejador de eventos.e.preventDefault() se utiliza para prevenir cualquier acción por defecto que pueda interferir con la funcionalidad deseada en el componente de React
    dispatch(orderByAlphabetico(e.target.value))
    setCurrentPage(1); //seteo la pagina principal
    setOrder(`Ordenado ${e.target.value}`)  //y aca lo seteo ordenado a tal forma, solamente para que me haga la modificacion en el renderizado . Es importante, sino no funciona el ordenamiento
  }

  const handleFilterAttack = (e) => {
    e.preventDefault()
    dispatch(orderByAttack(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  /*****RENDERIZAR***********/
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
          
          {/********RENDERIZAMOS LA FUNCION HANDLE CLICK***********/}
      <button className={styles.homeButtons} onClick={e => {handleClick(e)}}> {/*Le paso el handleClick para cuando suceda esto, resetee los personajes */}
      Load All Pokemons
      </button>

      {/************RENDERIZAMOS COMPONENT SEARCHBAR**********/}
      <SearchBar />
        </ul>
      </div>
      
      <div className={styles.orderFilter}>
      <ul> 
         {/*****************FILTERS TYPES AND CREATED*************/} {/*Siempre que hagamos una logica, tiene que tener un value*/}      
        {/*RENDERIZAMOS LA FUNCION HANDLEFILTERTYPES*************/}
      <li>
        <select onChange={e => handleFilterTypes(e)} > {/*El handleFilterTypes Siempre se va a agarrar del e.event.value */}
        <option className={styles.title} >Filter by Types</option>
        <option value='all'>Todos</option>
                {allTypes?.map((t) => {  return (
                  <option key={t.id} value={t.name} >{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</option>  
                  )})}            
        </select>
        </li>
        <li>
        {/*RENDERIZAMOS LA FUNCION HANDLEFILTERCREATED************/}
        <select onChange={e => handleFilterCreated(e)}>
          <option className={styles.title} >Filter by Existing or Created</option> {/*Los payload son All, Create, Api */}
          <option value='all'>All</option>
          <option value='created'>Created</option> {/*Lo que me permite acceder que valor tiene cada option, para que desde que el ftron haga click y se haga la logica. si o si tiene que pasarle un value  */}
          <option value='api'>Existing</option>
        </select>
        </li>
      {/****************ORDER ALPHABETICO AND ATTACK***************/}
      {/****************RENDERIZAMOS LA FUNCION HANDLEFILTERALPHABETICO*************/}
        <li>
        <select onChange={e => handleFilterAlphabetico(e)}> 
          <option className={styles.title} >Alphabetical Order</option>
          <option value='asc'>A-Z</option>
          <option value='desc'>Z-A</option>
        </select>
        </li>
        {/*RENDERIZAMOS LA FUNCION HANDLEFILTERATTACK**************/}
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
      
        {/*RENDERIZAMOS COMPONENT CARD CON SUS PROPIEDADES AND PAGINATE: MAP PARA VER SI TENEMOS O NO LOS POKEMONS  */}
        <div className={styles.gridContainer}>
  {currentPage.length === 0 ? (
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
      
        {/***********RENDERIZAMOS COMPONENT PAGINATE***************/}
          <Paginate
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
          /> 
      
          
        
    
      
 
    </div>
  )
}

export default Home