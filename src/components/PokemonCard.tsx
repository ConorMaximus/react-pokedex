import React from 'react'
import '../styles/pokemon.scss'

const PokemonCard = ({pokemon}) => {

    const type = pokemon.types[0].type.name

    const mystyle = {
        width: "200px",
        height: "200px",
      };

    return (
        <div className={'pokemon-card ' + type}>
            <div>
                <small>#{pokemon.id}</small>
            </div>
            <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} style={mystyle}/>
            <div className='detail-wrapper'>
                <h3>{pokemon.name}</h3>
                <small>{type}</small>
            </div>
        </div>
    )}

export default PokemonCard