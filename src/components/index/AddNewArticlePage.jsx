import React, { useCallback, useLayoutEffect, useState } from "react";
import "../../styles/EditArticlePage.css"
export default function AddNewArticlePage({ userInfo }) {
    const [categoryName, setCategory] = useState([]);
    const [stateMsg, setStateMsg ] = useState(null);
    useLayoutEffect( () => {
        async function fetchData(){
            let formData = new FormData();
            formData.append("controller", "ArticlesController");
            formData.append("action", "getallcategories");
            let options = {
                method: "post",
                credentials: "include",
                body: formData
            };
            const request = await fetch("https://urtubeback.herokuapp.com/index.php", options)
            const response = await request.json()
            setCategory(response);
        }
        fetchData();
    }, [])
    const handleSubmit = (e)=>{
        e.preventDefault();
        let formData = new FormData(e.target);
        formData.append("controller","ArticlesController");
        formData.append("action","addArticle");
        let options ={method : "post",
                    credentials :"include",
                    body : formData};
        fetch("https://urtubeback.herokuapp.com/index.php", options)
        .then(data=>data.json())
        .then(data=>{
            setStateMsg(data);
            e.target.reset();
        });
        
    }
    return (
        <div className="editPopup visible" id="editPopup">
            <div className="thePopup" id="thePopup">
                <div className="title">
                    <h2>Détails de l'article</h2>
                    <p>{stateMsg}</p>
                </div>
                <div className="body1">
                    <form action="" id="editPopupForm" onSubmit={handleSubmit}>
                        <div className="head user">
                            <div className="leftEdit">
                                <div className="sender">
                                    <label htmlFor="">Autheur :</label>
                                    <label id="pseudo" htmlFor="">{userInfo.pseudo}</label>
                                    <input hidden id="idUser"  name="idUser" value={userInfo.idUser} readOnly required/>
                                </div>
                                <div className="email">
                                    <label htmlFor="">Email :</label>
                                    <label id="email" htmlFor="">{userInfo.email}</label>
                                </div>

                                <div className="category">
                                    <label htmlFor="">Categorie</label>

                                    <select name="idCategory" id="idCategory"  required>
                                        {categoryName.map(x => <option key={x.idCategorie} value={x.idCategorie}>{x.categorieName}</option>)}
                                    </select>
                                </div>
                                <div className="articleTitle">
                                    <label htmlFor="">Titre : </label>
                                    <input id="title" name="title" type="text"  required />
                                </div>
                                <div className="smallDesc">
                                    <label htmlFor="">Tags : </label>
                                    <input id="tag" name="tag" type="text"  required/>
                                </div>
                            </div>
                            <div className="rightEdit">
                                <div className="photo">
                                    <img id="photo" src="/assets/image/logo.png" alt="l'article à poster" srcSet="" data-src="logo.png" />
                                </div>
                                <div className="fileUpload">
                                    <input className="form-control" type="file" id="formFile" name="file"  required/>
                                </div>
                            </div>

                        </div>
                        <div className="messageContent">
                            <textarea name="smallDesc" id="smallDesc" cols="30" rows="7" required></textarea>
                        </div>
                        <div className="editButton">
                            <button name="updateButton" id="updateButton">Ajouter Article</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}