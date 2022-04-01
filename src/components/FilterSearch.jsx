import React, { useEffect, useState } from "react"
import { Collapse } from "bootstrap"
import "../styles/FilterSearch.css"


export default function FilterSearch({allArticles}) {
    let [toggle, setToggle] = useState(false);
    
    useEffect(() => {
        let myCollapse = document.getElementById("flush-collapseOne");
        let bsCollapse = new Collapse(myCollapse, { toggle: false });
        toggle ? bsCollapse.show() : bsCollapse.hide();
    })
    
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
                        <ul>
                        <p>Trier par Type</p>
                            <li>Video</li>
                            <li>Image</li>
                        </ul>
                        <ul>
                        <p>Par Catégories</p>
                            <li>Divertissement</li>
                            <li>Comédie</li>
                            <li>Réels</li>
                        </ul>
                        <ul>
                        <p>Par Date</p>
                            <li>Ascendant</li>
                            <li>Descendant</li>
                        </ul>
                        <ul>
                        <p>Par Autheur</p>
                            <li>Ascendant</li>
                            <li>Descendant</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}