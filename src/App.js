import { useState } from 'react';
import './App.css';
import PokedexSelector from './pokedexSelector';
import Pokedex from './pokedex';
import { Pokedex as pkmn } from 'pokeapi-js-wrapper';

function App() {
    const [currPokedex, setCurrPokedex] = useState(); // State of which Pokedex user has selected
    const P = new pkmn();
  return (
    <div className="App">
        {
            
            currPokedex ? (<Pokedex currPokedex={currPokedex} setCurrPokedex=
                
            {setCurrPokedex} module={P}/>) : <PokedexSelector setCurrPokedex=
            
            {setCurrPokedex} module={P}/>

        }
    </div>
  );
}

export default App;
