import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [berryQuery, setBerryQuery] = useState("");
  const [berry, setBerry] = useState(null);
  const [berryError, setBerryError] = useState(null);

  const fetchPokemon = async () =>
    {
    if (!query) return;
    setError(null);
    try
    {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokémon not found");
      const data = await response.json();
      setPokemon(data);
    }
    catch (err)
    {
      setError(err.message);
      setPokemon(null);
    }
  };

  const fetchBerry = async () => {
    // IMPLEMENT FUNCTION HERE...
    console.log("This function doesn't exist yet!");
  };

  return (
    <> 
    <div className="container">
      <h1>Pokémon Search</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={query}
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
      </div>
    </div>
    </>
  );
};

export default App;