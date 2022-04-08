import React from "react";
import DecodeEntity from "./decodeHtml"


export default function CardOnePage({articleInfo}){

    
    return(
        <div className="cardsMain" >
        
        <div className="imgArticle">
        
        {articleInfo.fileType==="video" ? <video src={"https://urtubeback.herokuapp.com/public/articlefile/"+articleInfo.filePath}  controls /> : <img src={"https://urtubeback.herokuapp.com/public/articlefile/"+articleInfo.filePath} alt="l'article"></img>}
        </div>
        <div className="imgUser">
        <img src={"https://urtubeback.herokuapp.com/public/userprofile/"+articleInfo.profilPhoto} alt="user"></img>
            
            <div className="resume">
                <p className="title">{ DecodeEntity(articleInfo.title)}</p>
                <p className="submitter">{articleInfo.pseudo +" | Catégorie : "+ articleInfo.categorieName}</p>
                <p className="viewed">{articleInfo.viewCount +" Vues  | Tag :" +articleInfo.tag }</p>
                <p className="viewed">Description :</p>
                <p className="viewed">{ DecodeEntity(articleInfo.smallDesc)}</p>
            </div>
            
        </div>
    </div>
    )
}