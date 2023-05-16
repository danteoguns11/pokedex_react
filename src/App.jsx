import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Pokedex } from './components/Pokedex'

function App() {
  return (
    <>
      <h1>Pokedex</h1>

      <Pokedex />
    </>
  )
}

export default App
