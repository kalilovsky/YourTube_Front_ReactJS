import "../styles/bootstrap.css"
import searchIcon from "../assets/search-icon.svg"
import React from "react";

function SearchBar() {

    return (
        
        <div className="input-group rounded">
            <div className="form-outline">
                <input type="search" id="form1" className="form-control" placeholder="Search"/>
            </div>
            <button type="button" className="btn" style={{borderColor : "#ced4da" }}>
                <img src={searchIcon} style={{width : '20px'}}  alt="test"></img>
            </button>
        </div>
    )
}

export default SearchBar;