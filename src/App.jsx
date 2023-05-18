import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { PokeForm } from './components/PokeForm';
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
    </>
  )
}

export default App
