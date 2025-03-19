import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [berryQuery, setBerryQuery] = useState("");
  const [berryError, setBerryError] = useState(null);

  const fetchPokemon = async () => {
    // If there's no query, then there's no search.
    if (!query) return;
    setError(null);
    try
    {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);

      // If the pokemon is mispelled or it doesn't exist
      if (!response.ok) throw new Error("Pokémon not found");

      // If the code made it here, we found a pokemon, therefore we store it as data
      const data = await response.json();
      setPokemon(data);

    }
    // Other errors with the API might occur, if so,
    // it will display this error on the console
    catch (err)
    {
      setError(err.message);
      setPokemon(null);
    }
  };

  // Fetch Berry Function
  const fetchBerry = async () => {
    setBerryError("This function doesn't work :(")
    // This function is empty, for now...
  }

  // This is the UI, however, I'd like for you to check out some of the fields
  // on the pokemon object. These are accessible thanks to the API, which has
  // mapped all of this data for you.

  // For example: pokemon.name, pokemon.stats, pokemon.sprites are all fields 
  // available from just one search.
  return (
    <> 
    <div className="container">
      <h1>Pokémon Search</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={query}

          // This line below sets the query to the value found in the searchbox
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchPokemon}>Search</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {pokemon && (
        <div className="pokemon-card">
          <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>Stats</h3>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}
              </li>
            ))}
          </ul>
          <h3>Abilities</h3>
          <ul>
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>
                {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    <div className="container">
      <h2>Berry Search</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter name of berry"
          value={berryQuery}
          onChange={(e) => setBerryQuery(e.target.value)}
        />
      <button onClick={fetchBerry}>Search</button>
      {berryError && <p className="error-message">{berryError}</p>}
      {/* IMPLEMENT BERRY FUNCTION HERE */}
      </div>
    </div>
    </>
  );
};

export default App;
