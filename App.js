// Import necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.example.com/movies'); // Replace with a real API
        setMovies(response.data);
      } catch (error) {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle category filter change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Add movie to favorites
  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  // Remove movie from favorites
  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter((movie) => movie.id !== movieId));
  };

  // Filter movies based on search and category
  const filteredMovies = movies.filter((movie) => {
    return (
      (movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
      (movie.category === category || category === '')
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <header>
        <h1>Movie List</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select value={category} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
          </select>
        </div>
      </header>

      <main>
        <section className="movies">
          <h2>Movies</h2>
          <div className="movie-list">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <h3>{movie.title}</h3>
                <p>{movie.category}</p>
                <button onClick={() => addToFavorites(movie)}>Add to Favorites</button>
              </div>
            ))}
          </div>
        </section>

        <section className="favorites">
          <h2>Favorites</h2>
          <div className="movie-list">
            {favorites.map((movie) => (
              <div key={movie.id} className="movie-card">
                <h3>{movie.title}</h3>
                <p>{movie.category}</p>
                <button onClick={() => removeFromFavorites(movie.id)}>Remove</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
