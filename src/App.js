import React, { useEffect, useState } from'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg'
import DarkModeIcon from './darknlight.avif'

// 7f0dcc6d api key
const API_URL = 'http://www.omdbapi.com/?apikey=7f0dcc6d&t=';
const movie1={
  
    "Title": "Star Wars: Episode I - The Phantom Menace",
    "Year": "1999",
    "imdbID": "tt0120915",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
}


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const searchMovies = async (title) => {
  const response = await fetch(`${API_URL}&s=${title}`);
  const data = await response.json();
  setMovies(data.Search);  
  }
  const toggleDarkMode = () => {
  setIsDarkMode(!isDarkMode);

  }

useEffect(() => {
  searchMovies('Star Wars');
  },[]);

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
  <div className='header'>
    <h1>MovieFlix</h1>
    <button onClick={toggleDarkMode} className={`darkModeButton ${isDarkMode ? 'dark' : 'light'}`}>
      <img src={DarkModeIcon} alt="darkmode"  className='darkModeIcon'/>
    </button>
 </div>

<div className = 'search' >
  <input
  placeholder="Search for movies"
  value = {searchTerm}
  onChange={(e) =>setSearchTerm(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      searchMovies(searchTerm);
    }
  }}
  />
  <img src={SearchIcon} 
  alt="search" 
  onClick={() => searchMovies(searchTerm)}
  
 />
 </div>
 {movies?.length >0
  ? (
    <div className = 'container'>

      {movies.map((movie) => (
        <MovieCard movie = {movie}/>
        ))}
        
    </div>
  ) :(
<div className='empty'>
  <h2>No movies found</h2>
</div>

  )}
  

 </div>

    
  );
}

export default App;
