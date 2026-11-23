import NavBar from "../components/navBar";
import React, {useState, useEffect} from "react";
import { useNavigate, useLocation, useSearchParams, Link } from "react-router-dom";

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || '';

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(function() {
        if (!query) {
            setMovies([]);
            return;
        }

        const controller = new AbortController();

        async function fetchMovies() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8000/movies?search=${encodeURIComponent(query)}`, {signal: controller.signal});
                if (!response.ok) throw new Error(`Search failed ${response.status}`)
                const data = await response.json();

                setMovies(Array.isArray(data) ? data :data.results || data.movies || []);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setError('Could not connect to the server');
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }   
        }
        fetchMovies();
        return function() {
            controller.abort();
        }
    }, [query])
    

    const navigate = useNavigate();
    const location = useLocation();
    let user = null;
    if (location.state != null)
    {
        user = location.state.user;
    }
    return ( <>
        <NavBar user={user}/>
        <h1>Search results</h1>
        <h2 id="searchQuery">Results for {query}</h2>

        {loading && <p>Loading movies...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && movies.length === 0 && (<p>No movies found matching "{query}".</p>)}

        <div className="searchToolbar">
            <div className="searchSort sortControls">
            <button className="sortButton" type="button">Sort</button>
            <select className="sortSelect" name='movieSorting' id='movieSearchList' aria-label="Sort movies by">
              <option value="rating">Rating</option>
              <option value="genre">Genre</option>
              <option value="alphaAsc">A-Z</option>
              <option value="alphaDesc">Z-A</option>
            </select>
          </div>
        </div>
        <br />
        <div className="results">
            {movies.map((movie) => (
            <div className="resultBox" key={movie.movie_id}>
                <img id="resultImage" src={movie.poster} alt={movie.title}/>
                <h2 id="movieTitleRes">{movie.title}</h2>
                <button className="sortButton" id="selectedMovie" type="button" onClick={() => navigate(`/watch/${movie.movie_id}`, {state: { user }})}>Select Movie</button>
            </div>
            ))}


            <br />
        </div>
        </>
        )
    }

export default Search;
