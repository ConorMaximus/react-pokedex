import { useState, useEffect } from 'react'
import './App.css'
import PokemonList from './components/PokemonList'
import Pagination from './components/Pagination'
import Header from './components/Header'
import axios from 'axios'
import PokemonContainer from './components/PokecomeContainer'
import PokemonThumbnail from './components/PokemonThumbnail'

function App() {
  var pokeapiBaseUrl = 'https://pokeapi.co/api/v2/pokemon'
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState(pokeapiBaseUrl)

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()
    setLoadMore(data.next)
    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(pokeapiBaseUrl + '/' + pokemon.name)
        const data = await res.json()
        setAllPokemons(currentList => [...currentList, data])
      })
    }
    createPokemonObject(data.results)
    await console.log(allPokemons)
  }

  useEffect(() => {
    getAllPokemons()
  }, [])

  return (
    <div className='app-container'>
      <h1>Pokemon Evolution</h1>
      <div className='pokemon-conainer'>
        <div className='all-container'>
          {
            allPokemons.map((pokemon, index) => 
                <PokemonThumbnail 
                id={pokemon.id} 
                name={pokemon.name} 
                image={pokemon.sprites.other.dream_world.front_default} 
                type={pokemon.types[0].type.name} 
                key={index}
                />
            )
          }
        </div>
        <button className='load-more' onClick={() => getAllPokemons()}>Load more</button>
      </div>
    </div>
  )
}

export default App

/*
function App() {
  var pokeapiBaseUrl = 'https://pokeapi.co/api/v2/pokemon'
  const [pokemon, setPokemon] = useState([])
  const [currentPokemon, setCurrentPokemon] = useState()
  const [currentPageUrl, setCurrentPageUrl] = useState(pokeapiBaseUrl)
  const [nextPageUrl, setNextPageUrl] = useState()
  const [previousPageUrl, setPreviousPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  let randomPokemon:[] = []

  const promise1 = axios.get(pokeapiBaseUrl + '/1');
  const promise2 = axios.get(pokeapiBaseUrl + '/2');
  const promise3 = axios.get(pokeapiBaseUrl + '/3');
  const promise4 = axios.get(pokeapiBaseUrl + '/4');

  Promise.all([promise1, promise2, promise3, promise4]).then(function(values) {
    for(let i = 0; i < values.length; i++) {
      randomPokemon.push(values[i].data)
    }
    console.log(randomPokemon);
  });

  useEffect(() => {
    setLoading(true);
    let cancel: any
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false);
      setNextPageUrl(res.data.next)
      setPreviousPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
      setCurrentPokemon(pokemon[0])
    })
    return() => cancel()
  }, [currentPageUrl])

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPreviousPage() {
    setCurrentPageUrl(previousPageUrl)
  }

  if(loading) return "Loading..."

  return (
    <>
      <Header></Header>
      <PokemonContainer pokemon={currentPokemon} />
      <PokemonList pokemon={pokemon} />
      <Pagination 
      goToNextPage={nextPageUrl ? goToNextPage : null}
      goToPreviousPage={previousPageUrl ? goToPreviousPage : null} />
    </>
  )
}

export default App*/
