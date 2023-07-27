import React, { useState } from 'react'
import './mainMenu.css'
import PokeList from '../pokeList'
import PokeInfo from '../pokeInfo'

export default function MainMenu() {


  const [pokeId, setPokeId] = useState(null)


  const getId = (id) => {


    setPokeId(id)
  }
  return (
<div className='main-menu'>
        <PokeList setId={getId}/>
        <PokeInfo getId={pokeId} setId={getId}/>
</div>
   
  )
}
