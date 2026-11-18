import NavBar from "../components/navBar";
import MovieCard from "../components/movieCard";
import {useEffect, useState } from "react";
import axios from "axios";

function Catalog() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(function() {
        axios.get("http://localhost:8000/movies")
        .then((res) => {
            setMovies(res.data);
        })
        .catch((error) => {
            console.error(error);
            setError("Not able to load movies.");
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <>
            <NavBar user= {user}/>
            <h1>Our Catalog</h1>
            <br />
            <div className="movieCatalog">
                {movies.map((movie) => (
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
