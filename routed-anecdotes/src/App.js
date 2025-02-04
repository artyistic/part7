import { useState } from 'react'
import About from './components/About'
import CreateNew from './components/CreateNew'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'

import {
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import Anecdote from './components/Anecdote'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  const padding = {
    paddingRight: 5
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(note => note.id === Number(match.params.id))
    : null

  return (
      <>
        <div>
          <h1>Software Anecdotes</h1>
          <Link style={padding} to="/about">About</Link>
          <Link style={padding} to="/">anecdotes</Link>
          <Link style={padding} to="/create">Create new</Link>
          
        </div>
        <div>{notification}</div>
        <Routes>
          <Route path="/about" element={<About/>}/>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>}/>
          <Route path="/create" element={<CreateNew setNotification={setNotification} addNew={addNew}/>}/>
          <Route path="anecdotes/:id" element={<Anecdote anecdote={anecdote}/>}/>
        </Routes>
        <Footer />
      </>
  )
}

export default App
