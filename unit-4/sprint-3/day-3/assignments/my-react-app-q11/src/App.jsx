import './App.css'
import SearchForm from './components/SearchForm'
import MatchList from './components/MatchList'
import FavoritesList from './components/FavoritesList'

function App() {
  return (
    <div className="app-container">
      <div className="content-container">
        <div className="header">
          <h1 className="title">Football Match Tracker</h1>
          <p className="subtitle">Search and track your favorite football matches</p>
        </div>
        
        <div className="main-grid">
          <div className="sidebar">
            <SearchForm />
          </div>
          
          <div className="content">
            <FavoritesList />
            <MatchList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
