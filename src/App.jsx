import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Pokedex } from './components/Pokedex'
import { Pokecard } from './components/Pokecard'
import { PokeForm } from './components/PokeFrom';
import { ViewPokecard } from './components/ViewPokecard';


function App() {
  return (
    <>
      <h1>Pokedex</h1>

      <Routes>
        <Route path="/">
          <Route index element={<PokeForm />} />
          <Route path="/details/:pokemonId" element={<ViewPokecard />} />
        </Route>
      </Routes>

      {/* <Routes>
        <Route path="/">
          <Route index element={<Pokedex />} />
          <Route path="/details/:pokemonId" element={<Pokecard />} />
          <Route path="/form" element={<PokeForm />} />
        </Route>
      </Routes> */}
    </>
  )
}

export default App
