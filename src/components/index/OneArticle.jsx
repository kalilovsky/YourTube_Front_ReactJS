import "../../styles/OneArticle.css"
import React, { Fragment, useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CardOnePage from "../CardOnePage"

export default function OneArticle({allArticleInfo,incerementView}){
    const params = useParams()
    const [articleInfo,setArticleInfo] = useState({})
    const initArticle = useCallback(()=>    {
        
        const myArray = allArticleInfo.filter(item=>item.idArticle === params.idArticle)[0]
        return myArray;
    },[allArticleInfo])
    useEffect(()=>{
        setArticleInfo(initArticle()) ;
    },[allArticleInfo])

    useEffect(()=>{
        let formData = new FormData();
        formData.append("idArticle",params.idArticle)
        //formData.append("viewCount",allArticleInfo.filter(item=>item.idArticle === params.idArticle)[0].viewCount)
        formData.append("controller","ArticlesController");
        formData.append("action","updateView");
        let options ={method : "post",
                    credentials :"include",
                    body : formData,
                    
                };
        if ( articleInfo !== undefined && Object.keys(articleInfo).length >0){
        fetch("http://localhost:3000/index.php", options)
        .then(data=>data.json())
        .then(res=>{
            if (res ){
                incerementView(params.idArticle);
            }
        })
    }
    },[articleInfo])
    const rendering = ()=>{
       return articleInfo!==undefined ?  <CardOnePage articleInfo={articleInfo}/> : <p>en cours de chargement</p>
    }
    return(
        <Fragment>

            {rendering()}
        </Fragment>
     
    )
}