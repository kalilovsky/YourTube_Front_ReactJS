import "../styles/Cards.css"
import React, { useState, useRef } from "react";
import DecodeEntity from "./decodeHtml";
import { Link } from "react-router-dom";
//import imgArticle from "../assets/upload/account_default.png"


function Cards({articleInfo,incerementView1}) {
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
        // cardsMainDiv.current.classList.toggle("focused");
    }
    const handleMouseOut = (e)=>{
        //setTimeout(videoElement.current.load(),1000);
        if(videoElement.current !== undefined){
            
            videoElement.current.pause();
        }
        // cardsMainDiv.current.classList.toggle("focused");
    }
    const incerementView = ()=>{
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
                incerementView1();
            }
        })
    }
    return (
        <div className="cardsMain" onMouseOver={handleMouseIn} onMouseLeave={handleMouseOut} >
        <Link to={"/OneArticle/"+articleInfo.idArticle} onClick={incerementView}></Link>
            <div className="imgArticle">
            <span>{ articleInfo.fileType}</span>
            {articleInfo.fileType==="video" ? <video src={"https://urtubeback.herokuapp.com/public/articlefile/"+articleInfo.filePath}  ref={videoElement} loop muted /> : <img src={"https://urtubeback.herokuapp.com/public/articlefile/"+articleInfo.filePath} alt="l'article"></img>}
            </div>
            <div className="imgUser">
            <img src={"https://urtubeback.herokuapp.com/public/userprofile/"+articleInfo.profilPhoto} alt="user"></img>
                
                <div className="resume">
                    <p className="title">{ DecodeEntity(articleInfo.title)}</p>
                    <p className="submitter">{articleInfo.pseudo +" | Catégorie : "+ articleInfo.categorieName}</p>
                    <p className="viewed">{articleInfo.viewCount +" Vues  | Tag :" +DecodeEntity(articleInfo.tag) }</p>
                </div>
                
            </div>
        </div>
    )
}

export default Cards

