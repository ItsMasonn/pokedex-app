import { useState, useEffect } from 'react';
import { Pokedex as pkmn } from 'pokeapi-js-wrapper';


function PokedexSelector({setCurrPokedex, module}) {
    const [pokedexs, setPokedexs] = useState(); // List of all Pokedexs to render
    const [error, setError] = useState(); // Error message
    

    useEffect(() => { // On first render, get list of all Pokedexs or throw error
        List();
    }, [setPokedexs]);

    const P = module;

    const List =  () => {
        P.getPokedexsList().then(function(response) {
            setPokedexs(response);
        }).catch(error => { // Rejected promise, throw error and update state variable
            setError(error);
        });
    }

    return (
        <div>
            <h1>Pokedex Selector</h1>
            <ul>
                {pokedexs ? pokedexs.results.map((pokedex, index) => <li key={index}>{pokedex.name}<button onClick={() => {
                    setCurrPokedex(pokedex.name)}} data-testid={`pokedex-${index}`}>View Pokedex</button></li>) : <div>{error}</div>}
            </ul>
        </div>
    )
}

export default PokedexSelector;