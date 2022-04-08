import "../../styles/OneArticle.css"
import React, { Fragment, useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CardOnePage from "../CardOnePage"

export default function OneArticle({allArticleInfo}){
    const params = useParams()
    const [articleInfo,setArticleInfo] = useState({})
    const initArticle = useCallback(()=>    {
        if (allArticleInfo.length >0){
            console.log('def');
        }
        const myArray = allArticleInfo.filter(item=>~~item.idArticle === ~~params.idArticle)[0]
        console.log(myArray);
        return myArray;
    },[allArticleInfo])
    useEffect(()=>{
        setArticleInfo(initArticle()) ;
    },[allArticleInfo])

    useEffect(()=>{
    //}
    
    },[])
    const fetch = useCallback(()=>{
        
    })
    const rendering = ()=>{
       return articleInfo!==undefined ?  <CardOnePage articleInfo={articleInfo}/> : <p>en cours de chargement</p>
    }
    return(
        <Fragment>

            {rendering()}
        </Fragment>
     
    )
}