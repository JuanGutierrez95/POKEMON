import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home';
import LandingPage from './views/LandingPage/LandingPage';
import Detail from './views/Detail/Detail';
import PokemonCreate from './views/PokemonCreated/PokemonCreate';

function App() {
  return (
    <BrowserRouter>
    <Switch>
    <div className="App">
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/> {/*El to es para los links, el route es para los path */} {/*renderiza el componente Home */} {/*Route para definir la ruta principal de la aplicación, que apunta a / */}
      <Route exact path="/pokemonCreate" component={PokemonCreate}/>
      <Route exact path="/pokemonDetails/:id" component={Detail}/>
    </div>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
