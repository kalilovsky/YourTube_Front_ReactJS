import "../../styles/index/body.css"
import React, { useState, useLayoutEffect, useEffect, useCallback } from "react";
import Cardsmanager from "../CardsManager"
import { useParams } from "react-router-dom";
function ManageArticles({ allArticles, cardsVisibility1, setCardsVisiblity1, userInfo,getAllArticle }) {
    let [renderedCards, setRenderedCards] = useState([]);
    
    useLayoutEffect(() => {
        setCardsVisiblity1(9);
    }, [])

    useEffect(() => {
       setRenderedCards(allArticles.filter(item=> ~~item.idUser=== ~~userInfo.idUser ? item : null));
    }, [allArticles]);

    const deleteArticle = (e)=>{
        const URL = "http://localhost:3000/index.php?controller=ArticlesController&action=deleteArticle&idArticle="+e.target.name
        fetch(URL)
        .then(data=>data.text)
        .then(resp=>{
            if (resp = "delete done"){
                setRenderedCards(renderedCards.filter(item=> ~~item.idArticle === ~~e.target.name ? null : item));
                getAllArticle();
            }else{
                console.log(resp);
            }
        })
    }
    const renderCardManager = useCallback(() => {
        let tmp = []
        for (let i = 0; i < cardsVisibility1; i++) {
            if (!Object.keys(renderedCards).length > 0) { return <p>En cours de chargement...</p> }

            if (Object.keys(renderedCards).length === (i)) {
                return tmp
            }

            tmp.push(<Cardsmanager key={renderedCards[i].idArticle} articleInfo={renderedCards[i]}>
                <div className="editBtn">
                    
                    <button type="button" name={renderedCards[i].idArticle} onClick={deleteArticle} className="btn btn-danger">Delete</button>
                </div>
            </Cardsmanager>)
        }
        return tmp
    }, [cardsVisibility1, renderedCards])
    return (
        <div className="manageArticles">
            {renderCardManager()}

        </div>
    )
}

export default ManageArticles