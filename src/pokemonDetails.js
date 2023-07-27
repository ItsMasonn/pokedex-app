import react from 'react';
import { useState, useEffect } from 'react';

function PokemonDetails({ selectedPokemon, module }) {
    const [pokemonDetails, setPokemonDetails] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        getPokemonDetails();
    }, [setPokemonDetails]);

    const getPokemonDetails = () => {
        const Pokedex = require("pokeapi-js-wrapper")
        const P = module;
        
        P.getPokemonByName(selectedPokemon).then(function(response) {
            console.log(response);
            setPokemonDetails(response);
        }).catch(error => {
            setError(error);
            console.log(error);
        });
    }

    return (
        <div>
            <h1>Pokemon Details</h1>
            <img src={pokemonDetails ? pokemonDetails.sprites.front_default : ""} />
            <h2>{pokemonDetails ? pokemonDetails.name : ""}</h2>
            {
                pokemonDetails ? pokemonDetails.stats.map((stat, index) => <li key={index}>{stat.stat.name}: {stat.base_stat}</li>) : (<div>{error}</div>)
            }
            {
                pokemonDetails ? pokemonDetails.types.map((type, index) => <li key={index}>{type.type.name}</li>) : (<div>{error}</div>)
            }
        </div>
    )
}

export default PokemonDetails;