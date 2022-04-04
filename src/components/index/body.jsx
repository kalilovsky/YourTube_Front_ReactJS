import "../../styles/index/body.css"
import React, { useEffect, useState,useLayoutEffect,useCallback } from "react";
import Cards from "../Cards"
function Bodycontent({allArticles,cardsVisibility1,setCardsVisiblity1}) {
    
    let [renderedCards, setRenderedCards] = useState([]);
    useLayoutEffect(()=>{
        setCardsVisiblity1(9);
    },[])

    useEffect(()=>{
        setRenderedCards(allArticles);
    },[allArticles,cardsVisibility1]);

    const renderCardManager =useCallback(()=>{
        let tmp =[]
        for(let i =0; i< cardsVisibility1; i++){
            if(!Object.keys(renderedCards).length>0){return <p>En cours de chargement...</p>}
            tmp.push(<Cards key={renderedCards[i].idArticle} articleInfo={renderedCards[i]}/>)
        }
        return tmp
    },[cardsVisibility1,renderedCards])

    return (
        <div className="body">
            {renderCardManager()}
            
        </div>
    )
}

export default Bodycontent