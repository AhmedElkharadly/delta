import React from "react";
import './search.css'
import { searchIc } from "./svg";
const SearchBar = (props) => {
    return ( 
        <form className='search_form' action="/" method="get">
        <label className='searchIc' htmlFor="header-search">
            {searchIc}
        </label>
        <input
            autoComplete="off"
            className='search_input'
            type="text"
            id="header-search"
            placeholder="Search Assets"
            name="s" 
        />
        <button className="visually-hidden" type="submit">Search</button>
    </form>
     );
}
 
export default SearchBar;