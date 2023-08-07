import { useState, useEffect } from 'react'
import './App.css'
import Pagination from './components/Pagination'
import axios from 'axios'
import PokemonCard from './components/PokemonCard'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import PokemonGame from './components/PokemonGame'

function App() {
  var pokeapiBaseUrl = 'https://pokeapi.co/api/v2/pokemon'
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState(pokeapiBaseUrl)
  const [nextPageUrl, setNextPageUrl] = useState()
  const [previousPageUrl, setPreviousPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancel: any
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false);
      setNextPageUrl(res.data.next)
      setPreviousPageUrl(res.data.previous)
      res.data.results.forEach(async (pokemon) => {
        axios.get(pokeapiBaseUrl + '/' + pokemon.name).then(res => {
          setPokemon(currentList => [...currentList, res.data])
        })
      })
    })
    return() => cancel()
  }, [currentPageUrl])

  function goToNextPage() {
    setPokemon([])
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPreviousPage() {
    setPokemon([])
    setCurrentPageUrl(previousPageUrl)
  }

  if(loading) return "Loading..."

  return (
    <>
      <h1>Pokemon</h1>
      <Tabs>
        <TabList>
          <Tab>Pokedex</Tab>
          <Tab>Whos that pokemon</Tab>
        </TabList>

        <TabPanel>
          <div className='app-container'>
            <div className='pokemon-container'>
              {
                pokemon.map((pokemon, index) => 
                  <PokemonCard 
                    pokemon={pokemon}
                    key={index}
                  />
                )
              }
            </div>
            <Pagination 
              goToNextPage={nextPageUrl ? goToNextPage : null}
              goToPreviousPage={previousPageUrl ? goToPreviousPage : null} />
          </div>
        </TabPanel>
        <TabPanel>
          <PokemonGame />
        </TabPanel>
      </Tabs>
    </>
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
