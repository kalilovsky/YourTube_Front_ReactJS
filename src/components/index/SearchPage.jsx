import "../../styles/index/body.css"
import React, { useLayoutEffect, useState, useEffect, useCallback } from "react";
import Cardsmanager from "../CardsManager"
import FilterSearch from "../FilterSearch";
import { useParams, useSearchParams } from "react-router-dom";
import DecodeEntity from "../decodeHtml";
function SearchPage({ allArticles, cardsVisibility1, setCardsVisiblity1,tagAndWordSearch,resetTagAndWord,incerementView1}) {
    let [renderedCards, setRenderedCards] = useState([]);
    const [filter, setFilter] = useState({
        fileType: "Tous",
        idCategory: "Tous",
        creationDate: "Ascendant",
        author: "Ascendant",
        tagSearch: "",
        wordSearch: ""
    })
    
    useLayoutEffect(() => {
        setCardsVisiblity1(9);
    }, [])
    useEffect(() => {
        setRenderedCards(allArticles);
        startFilter()
    }, [allArticles]);
    useEffect(() => {
        startFilter();
    }, [filter])
    useEffect(()=>{
        setFilter({...filter,...tagAndWordSearch});
    },[tagAndWordSearch])
    const renderCardManager = useCallback(() => {
        let tmp = []
        for (let i = 0; i < cardsVisibility1; i++) {
            if (!Object.keys(renderedCards).length > 0) { return <p>En cours de chargement...</p> }

            if (Object.keys(renderedCards).length === (i)) {
                return tmp
            }

            tmp.push(<Cardsmanager key={renderedCards[i].idArticle} incerementView={incerementView1} articleInfo={renderedCards[i]} />)
        }
        return tmp
    }, [cardsVisibility1, renderedCards])

    //Filtre selon Cat, Type de fichier ....etc
    const startFilter = () => {
        //  Filtrer par category
        let filteredCards = allArticles.filter(item => {
            if (filter.idCategory === "Tous") return allArticles;
            return item.idCategory === filter.idCategory ? item : false;
        })
        
        // Filtrer par type de fichier
        filteredCards = filteredCards.filter(item => {
            if (filter.fileType === "Tous") return filteredCards;
            return item.fileType === filter.fileType.toLowerCase() ? item : false;
        })
        // Filtrer par Date
        filteredCards = filteredCards.sort((item1, item2) => {
            if (filter.creationDate === "Ascendant") return Date.parse(item1.creationDate) - Date.parse(item2.creationDate)
            return -Date.parse(item1.creationDate) + Date.parse(item2.creationDate)
        })
        //filtrer par vues
        filteredCards = filteredCards.sort((item1, item2) => {
            if(filter.author==='Ascendant') return item1.viewCount - item2.viewCount ;
            return item2.viewCount - item1.viewCount;
            
        })
        //filtrer par tag
        if (filter.tagSearch !== "") {
            filteredCards = filteredCards.filter(item => {
                return DecodeEntity(item.tag).includes(filter.tagSearch);
            })
        }
        //filtre par mots
        const includedColumns = ["title","smallDesc","pseudo","tag","categorieName"]
        if (filter.wordSearch!==""){    
            filteredCards = filteredCards.filter(item=>{
                
                return Object.keys(item).some(key=>DecodeEntity(item[key]).toLowerCase().includes(filter.wordSearch.toLowerCase())?item:false)
            })
        }
        setCardsVisiblity1(filteredCards.length > 6 ? 6 : filteredCards.length)
        setRenderedCards(filteredCards)

    }

    const handelFilterChange = (data) => {
        setFilter({ ...filter, ...data })
    }

    const resetFilter = ()=>{
        setFilter({
            fileType: "Tous",
            idCategory: "Tous",
            creationDate: "Ascendant",
            author: "Ascendant",
            tagSearch: "",
            wordSearch: ""
        })
        resetTagAndWord();
    }
    return (
        <div className="manageArticles">
            <FilterSearch allArticles={allArticles} startFilter={handelFilterChange} setTagAndWordSearch={resetFilter} />
            <div className="body">
                {
                    renderCardManager()
                }

            </div>
        </div>
    )
}

export default SearchPage