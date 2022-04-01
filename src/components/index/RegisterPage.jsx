import React from "react";
import '../../styles/RegisterPage.css'

export default function RegisterPage({userInfo,setUserInfo}){
    const handleSubmit = (e)=>{
        e.preventDefault();
        let formData = new FormData(e.target);
        formData.append("controller","UsersController");
        formData.append("action","register");
        let options ={method : "post",
                    credentials :"include",
                    body : formData};
        fetch("http://localhost:3000/index.php", options)
        .then(data=>data.json())
        .then(data=>{
            if (!data.isConnected) {
                setUserInfo(data);
                alert(data.messageRegister);
            } else {
                document.cookie = "userInfo=" + JSON.stringify(data);
                setUserInfo(data);
                //document.cookie = "cookiename= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            }
        })
        .catch((error)=>{
        });
    }
    if(userInfo.isConnected){
        return(
            <div className="formRegister">

            <p>Vous êtes déja connecté, merci de changer de page.</p>
            </div>
        )
    }
    return(
        <form className="formRegister" id="formRegister" method="post" onSubmit={handleSubmit}>
        <div id="titreAndError">
            <h2>Inscription</h2>
            <p id="errorMsg">{userInfo.messageRegister !==null ? userInfo.messageRegister : null}</p>
        </div>
        <div className="allInput">

            <div className="row1">
                <div>
                    <label htmlFor="firstname">Nom</label>
                    <input type="text" name="firstname" placeholder="Nom" required/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Email" required/>
                </div>
                <div>
                    <label htmlFor="pwd">Mdp</label>
                    <input id="pwd1" type="password" name="pwd" placeholder="Mot de passe" required/>
                </div>
            </div>
            <div className="row1">
                <div>
                    <label htmlFor="lastname">Prénom</label>
                    <input type="text" name="lastname" placeholder="Prénom" required/>
                </div>
                <div>
                    <label htmlFor="pseudo">Pseudo</label>
                    <input type="text" name="pseudo" placeholder="Pseudo" required/>
                </div>
                <div>
                    <label htmlFor="pwd2">Mdp 2</label>
                    <input id="pwd2" type="password" name="pwd2" placeholder="Mot de passe2" required/>
                </div>
            </div>
        </div>


        <div className="button">
            <button type="submitAction" name="action" value="register" id="registerBtn">S'Inscrire</button>
        </div>
    </form>
    )
}