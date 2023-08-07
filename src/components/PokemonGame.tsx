import React, { useEffect, useState } from 'react'
import '../styles/pokemon.scss'
import axios from 'axios'
import PokemonDisplay from './PokemonDisplay'

const PokemonGame = () => {
    var pokeapiBaseUrl = 'https://pokeapi.co/api/v2/pokemon'
    const [imageStyle, setStyle] = useState('wrong')
    const [pokemon, setPokemon] = useState([])
    const [currentPokemon, setCurrentPokemon] = useState()
    const [currentPageUrl, setCurrentPageUrl] = useState(pokeapiBaseUrl)

  function generateRandomNumberBetweenRange(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const selectPokemon = (selection: number) => (event: any) => {
    if(selection == currentPokemon.id) {
      setStyle('correct')
    } else {
      setStyle('wrong')
    }
  };

  useEffect(() => {
    console.log(currentPokemon)
  }, [currentPokemon])

  useEffect(() => {
    setCurrentPokemon(pokemon[generateRandomNumberBetweenRange(0, pokemon.length)])
  }, [pokemon])

  useEffect(() => {
    const promise1 = axios.get(pokeapiBaseUrl + '/' + generateRandomNumberBetweenRange(1, 100));
    const promise2 = axios.get(pokeapiBaseUrl + '/' + generateRandomNumberBetweenRange(1, 100));
    const promise3 = axios.get(pokeapiBaseUrl + '/' + generateRandomNumberBetweenRange(1, 100));
    const promise4 = axios.get(pokeapiBaseUrl + '/' + generateRandomNumberBetweenRange(1, 100));
    Promise.all([promise1, promise2, promise3, promise4]).then(function(values) {
        setPokemon([])
        values.map(res => setPokemon(currentList => [...currentList, res.data]))
      });
  }, [currentPageUrl])


    return (
        <>
          { currentPokemon ? <PokemonDisplay pokemon={currentPokemon} imageStyle={imageStyle}/> : <h1>Loading pokemon</h1> }
          <br />
          <div className='button-container'>
            {pokemon.map((pokemon, index) => <button key={index} onClick={selectPokemon(pokemon.id)}>{pokemon.name}</button>)}
          </div>
        </>
    )
}

export default PokemonGame