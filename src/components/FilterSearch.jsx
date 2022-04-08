import React, { useEffect, useState, useLayoutEffect } from "react"
import { Collapse } from "bootstrap"
import "../styles/FilterSearch.css"


export default function FilterSearch({ allArticles, startFilter,setTagAndWordSearch }) {
    const [toggle, setToggle] = useState(false);
    const [categoryName, setCategory] = useState([]);
    const [filter, setFilter] = useState({  fileType : "Tous",
                                            idCategory : "Tous",
                                            creationDate : "Ascendant",
                                            author : "Ascendant"})
    useLayoutEffect(() => {
        async function fetchData() {
            let formData = new FormData();
            formData.append("controller", "ArticlesController");
            formData.append("action", "getallcategories");
            let options = {
                method: "post",
                credentials: "include",
                body: formData
            };
            const request = await fetch("https://urtubeback.herokuapp.com/index.php", options)
            const response = await request.json()
            setCategory(response);
        }
        fetchData();
    }, [])
    useEffect(() => {
        let myCollapse = document.getElementById("flush-collapseOne");
        let bsCollapse = new Collapse(myCollapse, { toggle: false });
        toggle ? bsCollapse.show() : bsCollapse.hide();
    })

    const handelSubmit = (e)=>{
        e.preventDefault()

        startFilter(filter);
    }

    const handelInputChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setFilter({...filter,[name] : value});
    }

    const resetFilter = ()=>{
        setFilter({...filter, fileType : "Tous",
                    idCategory : "Tous",
                    creationDate : "Ascendant",
                    author : "Ascendant"});
        
        setTagAndWordSearch()
        startFilter({fileType : "Tous",
                    idCategory : "Tous",
                    creationDate : "Ascendant",
                    author : "Ascendant"})
    }
    return (
        <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed" onClick={() => setToggle(toggle => !toggle)} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Filtres
                    </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                    <form onSubmit={handelSubmit}>
                        <ul>
                            <p>Trier par Type</p>
                            <select name="fileType" value={filter.fileType} onChange={handelInputChange}>
                                <option>Tous</option>
                                <option>Video</option>
                                <option>Image</option>
                            </select>
                        </ul>
                        <ul>
                            <p>Par Catégories</p>
                            <select name="idCategory" value={filter.idCategory} onChange={handelInputChange}>
                                <option>Tous</option>
                                {categoryName.map(x => <option key={x.idCategorie} value={x.idCategorie}>{x.categorieName}</option>)}
                            </select>
                        </ul>
                        <ul>
                            <p>Par Date</p>
                            <select name="creationDate" value={filter.creationDate} onChange={handelInputChange}>
                                <option>Ascendant</option>
                                <option>Descendant</option>
                            </select>
                        </ul>
                        <ul>
                            <p>Par Vues</p>
                            <select name="author" value={filter.author} onChange={handelInputChange}>
                                <option>Ascendant</option>
                                <option>Descendant</option>
                            </select>
                        </ul>
                        <ul>
                            <button type="submit" className="btn btn-primary">
                            Recherche
                            </button>
                            <button type="button" className="btn btn-primary" onClick={resetFilter}>Reset</button>
                        </ul>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}