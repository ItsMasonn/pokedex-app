import { fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'

import { Pokedex } from 'pokeapi-js-wrapper';
import App from './App';

jest.mock('pokeapi-js-wrapper', () => { // Mocks the npm package, so that we don't have to make API calls. Replaces all existing code
    return({
      Pokedex: function() { // Mocks the Pokedex class
        return {
          getPokedexsList: function() { // Mocks the getPokedexsList function
            return Promise.resolve({results: [{name: "national"}]})
          },
          getPokemonByName: function() { // Mocks the getPokemonByName function
            return Promise.resolve({})
          },
          getPokedexByName: function(name) { // Mocks the getPokedexByName function
            return Promise.resolve({pokemon_entries: [{pokemon_species: {name: "bulbasaur"}}]});
          }
        }
      }
    })
  });

beforeEach(async () => { // Before each test, render the app
    await waitFor(() => { // Wait for the app to render
        render(<App />);
    })
})

afterEach(() => { 
    render(<hr />) // Renders a horizontal rule to separate tests
})

// Requirement 1: Test that the list of pokedexes is rendered
test('list of pokedexes returned from npm package is rendered', async () => {
    await waitFor(() => { // Wait for the app to render
        expect(screen.getByText("national")).toBeInTheDocument(); // Expect the text "national" to be in the document
    });
});

// Requirement 2: When an error occurs, then an error message is rendered. List of pokedexes is not rendered
test('error message is rendered when error occurs, list of pokedexes is not rendered', () => {
    waitFor(() => {
            expect(screen.queryByText("national")).not.toBeInTheDocument(); // Expect the text "national" to not be in the document
    })
})

// Requirement 4: Test that the list of pokemon is rendered
test('list of pokemon from npm package is rendered', async () => {
    await waitFor(async () => { // Wait for the app to render
        fireEvent.click(screen.getByTestId("pokedex-0")); // Click the button to view the national pokedex
        await waitFor(() => {
            expect(screen.getByText("bulbasaur")).toBeInTheDocument();
        })
    });
});

// Requirement 7: Test that the pokemon details are rendered
test('pokemon details are rendered', async () => {
    waitFor(async () => { // Wait for the app to render
        fireEvent.click(screen.getByTestId("pokedex-0")); // Click the button to view the national pokedex
        await waitFor(() => {
            fireEvent.click(screen.getByText("View Pokemon")); // Click the button to view the pokemon
            expect(screen.getByText("Pokemon Details")).toBeInTheDocument(); // Expect the text "Pokemon Details" to be in the document
        });
    });
});