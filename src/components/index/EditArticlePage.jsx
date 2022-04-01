import React from "react";
import "../../styles/EditArticlePage.css"

export default function EditArticlePage() {

    return (
        <div className="editPopup visible" id="editPopup">
            <div className="thePopup" id="thePopup">
               
                <div className="title">
                    <h2>Détails de l'article</h2>
                </div>
                <div className="body1">
                    <form action="" id="editPopupForm">
                        <div className="head user">
                            <div className="leftEdit">
                                <div className="sender">
                                    <label htmlFor="">Autheur :</label>
                                    <label id="pseudo" htmlFor=""></label>
                                    <input id="idArticle" type="hidden" name="idArticle" />
                                </div>
                                <div className="email">
                                    <label htmlFor="">Email :</label>
                                    <label id="email" htmlFor="">kalilov@hotmail.com</label>
                                </div>
                                <div className="date">
                                    <label htmlFor="">Date le :</label>
                                    <label id="creationDate" htmlFor="">12/12/2022</label>
                                </div>
                                <div className="category">
                                    <label htmlFor="">Categorie</label>

                                    <select name="idCategory" id="idCategory">
                                        <option value="1">Plat</option>
                                        <option value="2">Pâtisserie</option>
                                        <option value="3">Apéritif</option>
                                        <option value="6">Entrée</option>
                                        <option value="7">Dessert</option>
                                        <option value="8">Petit déjeuner</option>
                                    </select>
                                </div>
                                <div className="articleTitle">
                                    <label htmlFor="">Titre : </label>
                                    <input id="title" name="title" type="text" value="test" />
                                </div>
                                <div className="smallDesc">
                                    <label htmlFor="">Tags : </label>
                                    <input id="tag" name="smallDesc" type="text" value="tag" />
                                </div>
                            </div>
                            <div className="rightEdit">
                                <div className="photo">
                                    <img id="photo" src="/assets/image/logo.png" alt="" srcSet="" data-src="logo.png" />
                                </div>
                                <div className="fileUpload">
                                    <input className="form-control" type="file" id="formFile" name="file" />
                                </div>
                            </div>

                        </div>
                        <div className="messageContent">
                            <textarea name="content" id="content" cols="30" rows="7"></textarea>
                        </div>
                        <div className="editButton">
                            <button className="btn btn-primary" name="updateButton" id="updateButton">Update</button>

                            <button className="btn btn-danger" name="deleteButton" id="deleteButton">Supprimer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}