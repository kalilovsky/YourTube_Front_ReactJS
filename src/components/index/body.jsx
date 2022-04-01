import "../../styles/index/body.css"
import React, { useEffect, useState,useLayoutEffect } from "react";
import Cards from "../Cards"
function Bodycontent({allArticles,cardsVisibility1,setCardsVisiblity1}) {
    
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

        }
        
       
    },[allArticles,cardsVisibility1]);
    return (
        <div className="body">
            {renderedCards.map(x=><Cards key={x.idArticle} articleInfo={x}/>)}
            
        </div>
    )
}

export default Bodycontent