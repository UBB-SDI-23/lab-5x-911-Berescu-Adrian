import { useState } from 'react'
import './App.css'
import { MovieShowAll } from './components/movie/MovieShowAll'
import React from 'react'
import { DirectorShowAll } from './components/director/DirectorShowAll'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navbar } from './components/Navbar'
import { Home } from './components/Home'
import { DirectorDetails } from './components/director/DirectorDetails'
import { DirectorEdit } from './components/director/DirectorEdit'
import { DirectorRemove } from './components/director/DirectorRemove'
import { DirectorAdd } from './components/director/DirectorAdd'
import { DirectorAvg } from './components/director/DirectorAvg'

function App() {

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/directors" element={<DirectorShowAll/>}/>
          <Route path="/director/:directorID" element={<DirectorDetails/>} />
          <Route path="/director/add" element={<DirectorAdd/>} />
          <Route path="/director/:directorID/remove" element={<DirectorRemove/>} />
          <Route path="/director/:directorID/edit" element={<DirectorEdit/>}/>
          <Route path="/director/avg" element={<DirectorAvg/>} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App
