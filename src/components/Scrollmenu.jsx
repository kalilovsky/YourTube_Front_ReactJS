import '../styles/Scrollmenu.css'
import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom';

function Scrollmenu({ namedClass, changeVisibility, userInfo, setUserInfo, checkCookie }) {
    const disconnect = () => {
        console.log(document.cookie);
        // document.cookie = "userInfo={}";
        document.cookie = "userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        checkCookie();
        console.log(document.cookie);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        formData.append("controller", "UsersController");
        formData.append("action", "login");
        let options = {
            method: "post",
            credentials: "include",
            body: formData
        };
        fetch("http://localhost:3000/index.php", options)
            .then(data => data.json())
            .then(data => {
                if (!data.isConnected) {
                    setUserInfo(data);
                } else {
                    document.cookie = "userInfo=" + JSON.stringify(data);
                    //document.cookie = "cookiename= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                    setUserInfo(data);
                }
            })
            .catch((error)=>{
                console.log(error.message);
            });
        changeVisibility();
            
    }
    if (userInfo.isConnected) {
        return (
            <div className={"scrollMenu" + namedClass}>
                <ul onClick={changeVisibility}>
                    <li>
                        <Link to="/">Acceuil</Link></li>
                    <li>
                        <Link to="/managearticles/">Mon Contenu</Link>
                    </li>
                    <li>
                        <Link to="/searchpage/">Page de recherche</Link>
                    </li>
                    <li>
                        <Link to="/editmyprofile/">My Account</Link>
                    </li>
                    <li>
                        <Link to="/addnewarticlepage/">Add post</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={disconnect}>Déconnecter</Link>
                    </li>
                </ul>
            </div>
        )
    }
    return (
        <div className={"scrollMenu" + namedClass}>
            {userInfo.messageLogin!==""?<p style={{color:"red"}}>{userInfo.messageLogin}</p>:null}
            <form action="#" method="GET" className="formLogin" onSubmit={handleSubmit}>
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Email" required />
                </div>
                <div className="pwd">
                    <label htmlFor="pwd">Mot de passe</label>
                    <input type="password" name="pwd" placeholder="Mot de passe" required />
                    <input type="hidden" name="controller" value="userscontroller" />
                </div>
                <div className="button">
                    <button name="action" value="login">Login</button>
                </div>
            </form>
            <div>
                <p>
                    <Link to='/registerpage/' onClick={changeVisibility}>Register now!</Link>
                </p>
            </div>
        </div>
    )
}

export default Scrollmenu