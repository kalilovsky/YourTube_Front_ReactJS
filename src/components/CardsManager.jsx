import "../styles/CardsManager.css"
import React, { useRef, useState } from "react";
import DecodeEntity from "./decodeHtml";
import { Link } from "react-router-dom";
//import imgArticle from "../assets/upload/account_default.png"
function Cardsmanager({children,articleInfo}) {
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
    return (
        <div className="cardsManager" onMouseOver={handleMouseIn} onMouseLeave={handleMouseOut} >
        <Link to={"/OneArticle/"+articleInfo.idArticle}></Link>
            <div className="imgArticle">
                <span>{ articleInfo.fileType}</span>
                {articleInfo.fileType==="video"? <video src={"http://localhost:3000/public/articlefile/"+articleInfo.filePath}  ref={videoElement} loop muted /> : <img src={"http://localhost:3000/public/articlefile/"+articleInfo.filePath} alt="l'article"></img>}
            </div>
            <div className="imgUser">
                <div className="resume">
                    <p className="title">{ DecodeEntity(articleInfo.title)}</p>
                    <p className="viewed">{articleInfo.viewCount +" Vues"}</p>
                </div>
                <div className="otherDetail">
                    <img src={"http://localhost:3000/public/userprofile/"+articleInfo.profilPhoto} alt="test"></img>
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