import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home';
import LandingPage from './views/LandingPage/LandingPage';
import Detail from './views/Detail/Detail';
import PokemonCreated from './views/PokemonCreated/PokemonCreated';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch> 
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/> {/*El to es para los links, el route es para los path */} {/*renderiza el componente Home */} {/*Route para definir la ruta principal de la aplicación, que apunta a / */}
      <Route exact path="/pokemonCreate" component={PokemonCreated}/>
      <Route exact path="/pokemonDetail/:id" component={Detail}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
