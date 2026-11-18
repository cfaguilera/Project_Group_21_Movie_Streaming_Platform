import NavBar from "../components/navBar";
import { useNavigate, useLocation } from "react-router-dom";
import MovieCard from "../components/movieCard";

function Catalog() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state)
    let user = null;
    if (location.state != null)
    {
        user = location.state.user;
    }
    return (
        <>
            <NavBar user= {user}/>
            <h1>Our Catalog</h1>
            <br />
            <div className="movieCatalog">
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
            </div>
        </>
    );
}

export default Catalog;
