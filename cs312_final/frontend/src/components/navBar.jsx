import { Link, useNavigate, useSearchParams } from "react-router-dom";
import React, {useState, useEffect} from 'react';

function NavBar(props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(function() {
    setQuery(searchParams.get('q') || '');

  }, [searchParams])

  const handleSubmit = function(e) {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query.trim())}`, {state: {user: props.user}});
  }

  console.log(props.user)
  return (
    <div>
        <nav>
          <button id="navP" onClick={function() {navigate("/", {state: {user: props.user}})}}>Boomer Streaming</button>
          <button id="navCatalog" onClick={function() {navigate("/catalog", {state: {user: props.user}})}}>Our Catalog</button>
          {(props.user === null || props.user === undefined) ? (
            <div id="signins">
              <Link to="/signup">Sign up</Link>
              <Link to="/signin">Sign in</Link>
            </div>
          ) : (
            <p>Welcome, {props.user}</p>
          )
          }
          <div className="navActions">
            
            <form className="navSearchForm" role="search" action="/search" method="get" onSubmit={handleSubmit}>
              <input id="navSearch" type="search" placeholder="Search..." aria-label="Search movies" name="q" onChange={function(e) {setQuery(e.target.value)}} value={query}/>
              <button type="submit" id="searchButton">Search</button>
            </form>
          </div>
        </nav>
    </div>
  )
}

export default NavBar;

