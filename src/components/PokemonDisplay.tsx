import React from 'react'
import '../styles/pokemon.scss'

const PokemonDisplay = ({pokemon, imageStyle}) => {

    const type = pokemon.types[0].type.name

    const mystyle = {
        width: "200px",
        height: "200px",
      };

    return (
        <div className={'pokemon-card ' + type}>
            <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} style={mystyle} className={imageStyle} />
        </div>
    )}

export default PokemonDisplay