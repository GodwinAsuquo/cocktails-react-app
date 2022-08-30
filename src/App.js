import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import pages
import Home from './pages/Home'
import About from './pages/About'
import SingleCocktail from './pages/SingleCocktail'
import Error from './pages/Error'
// import components
import Navbar from './components/Navbar'
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='about' element={<About />}/>
        <Route path='cocktail/:id' element={<SingleCocktail />}/>
        <Route path='*' element={<Error />}/>
      </Routes>
    </Router>
  )
}

export default App

//we used 'exact path' so we'll go to the exact route instead of for example going to the home page when the user types in /about

// ':id' is us setting up param