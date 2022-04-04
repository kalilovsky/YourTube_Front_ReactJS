import "../styles/bootstrap.css"
import searchIcon from "../assets/search-icon.svg"
import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

function SearchBar({submitWordSearch,tagAndWordSearch}) {
    const [wordSearch, setWordSearch] = useState("")
    const handelChange= (e)=>{
        setWordSearch(e.target.value)
        
    }
    const handelWordSearch = ()=>{
        submitWordSearch(wordSearch);
    }
    useEffect(()=>{
        if(tagAndWordSearch.wordSearch==="") setWordSearch("");
    },[tagAndWordSearch])
    return (
        
        <div className="input-group rounded">
            <div className="form-outline">
                <input name="wordSearch" value={wordSearch} onChange={handelChange} type="search" id="wordSearchInput" className="form-control" placeholder="Search"/>
            </div>
            <button type="button" className="btn" style={{borderColor : "#ced4da" }} onClick={handelWordSearch}>
                <Link to={"/searchpage/"} id="searchButton"></Link>
                <img src={searchIcon} style={{width : '20px'}}  alt="test"></img>
            </button>
        </div>
    )
}

export default SearchBar;