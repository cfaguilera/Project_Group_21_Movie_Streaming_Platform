import NavBar from "../components/navBar";
import MovieCard from "../components/movieCard";
import {useEffect, useState } from "react";
import axios from "axios";

function Catalog(props) {
    const [movies, setMovies] = useState([]);
    const [selectedOption, setSelectedOption] = useState("alphaAsc");

    useEffect(function() {
        async function fetchMovies() {
            const response = await fetch("http://localhost:8000/movies");
            const data = await response.json();
            setMovies(data)
        }
        fetchMovies();
    }, []);

    const sortedMovies = [...movies].sort((a, b) => {
        switch (selectedOption) {
            case 'alphaAsc':
                return (a.title || "").localeCompare(b.title || "");
            case 'alphaDesc':
                return (b.title || "").localeCompare(a.title || "");
            case 'rating':
                return (b.rating || 0) - (a.rating || 0);
            case 'genre':
                return (a.genre || "").localeCompare(b.genre || "");
            default:
                return 0;
        }
    })
    

    return (
        <>
            <NavBar user= {props.user}/>
            <h1>Our Catalog</h1>
            <br />
            <div className="searchToolbar">
                <div className="searchSort sortControls">
                    <select
                        className="sortSelect" name="movieSorting" id="movieCatalogList" aria-label="Sort movies by" value={selectedOption}
                        onChange={(event) => setSelectedOption(event.target.value)}>
                        <option value="rating">Rating</option>
                        <option value="genre">Genre</option>
                        <option value="alphaAsc">A-Z</option>
                        <option value="alphaDesc">Z-A</option>
                    </select>
                </div>
            </div>
            <div className="movieCatalog">
                {sortedMovies.map((movie) => (
                    <div key={movie.movie_id} className="MovieCard">
                        <h2>{movie.title}</h2>
                        <img id="catalogMovieImage" src={movie.poster}></img>
                        <p>{movie.desc}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Catalog;
