import { useState } from 'react'
import './App.css'
import { MovieShowAll } from './components/movie/MovieShowAll'
import React from 'react'
import { DirectorShowAll } from './components/director/DirectorShowAll'

function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
      <DirectorShowAll />
      
    </React.Fragment>
  )
}

export default App
