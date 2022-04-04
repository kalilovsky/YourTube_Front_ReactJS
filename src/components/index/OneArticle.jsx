import "../../styles/OneArticle.css"
import React, { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CardOnePage from "../CardOnePage"

export default function OneArticle({allArticleInfo,incerementView}){
    const params = useParams()
    const [articleInfo,setArticleInfo] = useState({})
    
    useEffect(()=>{
        setArticleInfo(allArticleInfo.filter(item=>item.idArticle === params.idArticle)[0]);
        
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
        fetch("http://localhost:3000/index.php", options)
        .then(data=>data.json())
        .then(res=>{
            if (res){
                incerementView(params.idArticle);
            }
        })
    },[])
    console.log(articleInfo);
    const rendering = ()=>{
       return articleInfo!==undefined ?  <CardOnePage articleInfo={articleInfo}/> : null
    }
    return(
        <Fragment>

            {rendering()}
        </Fragment>
     
    )
}