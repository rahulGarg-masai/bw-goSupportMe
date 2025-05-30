import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageRef = useRef(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://rickandmortyapi.com/api/character')
        if (!response.ok) {
          throw new Error('Failed to fetch characters')
        }
        const data = await response.json()
        setCharacters(data.results)
        setTotalPages(Math.ceil(data.results.length / 10))
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [])

  useEffect(() => {
    pageRef.current = currentPage
  }, [currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const renderPagination = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            margin: '0 5px',
            padding: '5px 10px',
            backgroundColor: currentPage === i ? '#646cff' : '#1a1a1a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {i}
        </button>
      )
    }
    return pages
  }

  const getCurrentPageCharacters = () => {
    const startIndex = (currentPage - 1) * 10
    const endIndex = startIndex + 10
    return characters.slice(startIndex, endIndex)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="app-container">
      <h1>Rick and Morty Characters</h1>
      <div className="pagination">
        {renderPagination()}
      </div>
      <div className="characters-grid">
        {getCurrentPageCharacters().map(character => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
