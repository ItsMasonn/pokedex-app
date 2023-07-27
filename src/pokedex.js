import { useState, useEffect } from 'react';
import  PokemonDetails  from './pokemonDetails';
import { Pokedex as pkmn } from 'pokeapi-js-wrapper';

function Pokedex({ currPokedex, setCurrPokedex, module }) {
    const [pokemon, setPokemon] = useState();
    const [selectedPokemon, setSelectedPokemon] = useState();
    const [error, setError] = useState();
    const P = module;
    useEffect(() => {
        getPokemon();
    }, [setPokemon]);

    const getPokemon = () => {
        P.getPokedexByName(currPokedex).then(function(response) {
            console.log(response);
            setPokemon(response.pokemon_entries);
        }).catch(error => {
            setError(error);
            console.log(error);
        });
    }


    return (
        <div>
            <h1>Select your Pokemon</h1>
            <button onClick={() => { setCurrPokedex() }}>Home</button>
            <button onClick={() => { setSelectedPokemon() }}>Back</button>
            <h2>{currPokedex}</h2>
            {
                    selectedPokemon ? <PokemonDetails selectedPokemon={selectedPokemon} /> :
                pokemon ? pokemon.map((entries, index) => <li key={index}>{entries.pokemon_species.name}<button onClick={() => {
                    setSelectedPokemon(entries.pokemon_species.name)}}>View Pokemon</button></li>) : (<div>{error}</div>)
                }
        </div>
    )
}

export default Pokedex;