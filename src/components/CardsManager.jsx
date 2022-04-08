import "../styles/CardsManager.css"
import React, { useRef, useState } from "react";
import DecodeEntity from "./decodeHtml";
import { Link } from "react-router-dom";
//import imgArticle from "../assets/upload/account_default.png"
function Cardsmanager({children,incerementView,articleInfo}) {
    const videoElement = useRef();
    const [isVisible,setVisiblity] = useState(false);
    const handleMouseIn = (e)=>{
         if(videoElement.current !== undefined){

             let play = videoElement.current.play();
             if(play !==undefined){
                 play.then(()=>{

                 }).catch((e)=>{
                     console.log(e);
                 })
             }
         }
    }
    const handleMouseOut = (e)=>{
        if(videoElement.current !== undefined){
            
            videoElement.current.pause();
        }
    }
    const incerementViews = ()=>{
        let formData = new FormData();
        formData.append("idArticle",articleInfo.idArticle)
        //formData.append("viewCount",allArticleInfo.filter(item=>item.idArticle === params.idArticle)[0].viewCount)
        formData.append("controller","ArticlesController");
        formData.append("action","updateView");
        let options ={method : "post",
                    credentials :"include",
                    body : formData,
                    
                };
        //if ( articleInfo !== undefined && Object.keys(articleInfo).length >0){
        fetch("https://urtubeback.herokuapp.com/index.php", options)
        
        .then(data=>data.json())
        .then(res=>{
            if (res ){
                incerementView();
            }
        })
    }
    return (
        <div className="cardsManager" onMouseOver={handleMouseIn} onMouseLeave={handleMouseOut} >
        <Link to={"/OneArticle/"+articleInfo.idArticle} onClick={incerementViews}></Link>
            <div className="imgArticle">
                <span>{ articleInfo.fileType}</span>
                {articleInfo.fileType==="video"? <video src={"https://urtubeback.herokuapp.com/public/articlefile/"+articleInfo.filePath}  ref={videoElement} loop muted /> : <img src={"https://urtubeback.herokuapp.com/public/articlefile/"+articleInfo.filePath} alt="l'article"></img>}
            </div>
            <div className="imgUser">
                <div className="resume">
                    <p className="title">{ DecodeEntity(articleInfo.title)}</p>
                    <p className="viewed">{articleInfo.viewCount +" Vues"}</p>
                </div>
                <div className="otherDetail">
                    <img src={"https://urtubeback.herokuapp.com/public/userprofile/"+articleInfo.profilPhoto} alt="test"></img>
                    <p className="submitter">{articleInfo.pseudo}</p>
                    <p>&#8226;</p>
                    <p>{articleInfo.categorieName}</p>
                    <p>&#8226;</p>
                </div>
                <div className="description">
                    <p className="smallDesc">{ DecodeEntity(articleInfo.smallDesc)} </p>
                    <p>{"Tag : "+ DecodeEntity(articleInfo.tag)}</p>
                </div>
            </div>
            {children}
        </div>
    )
}

export default Cardsmanager