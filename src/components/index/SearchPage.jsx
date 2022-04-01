import "../../styles/index/body.css"
import React, { useLayoutEffect,useState,useEffect } from "react";
import Cardsmanager from "../CardsManager"
import FilterSearch from "../FilterSearch";
function SearchPage({allArticles,cardsVisibility1,setCardsVisiblity1}) {
    let [renderedCards, setRenderedCards] = useState([]);
    useLayoutEffect(()=>{
        setCardsVisiblity1(6);
        setRenderedCards(allArticles.slice(0,(cardsVisibility1)));

    },[])
    useEffect(()=>{
        if (allArticles.length>0 && renderedCards.length===1){
            setRenderedCards(allArticles.slice(0,(cardsVisibility1)));
        } else {
            let tmp = allArticles.slice(renderedCards.length,cardsVisibility1);
            setRenderedCards([...renderedCards,...tmp]);
            console.log(allArticles);

        }
       
       
    },[allArticles,cardsVisibility1]);
    return (
        <div className="manageArticles">
            <FilterSearch allArticles={allArticles}/>
            <div className="body">
            {renderedCards.map(x=><Cardsmanager key={x.idArticle} articleInfo={x}/>)}
            
        </div>
        </div>
    )
}

export default SearchPage