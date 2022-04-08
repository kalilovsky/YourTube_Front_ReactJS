import React, { useEffect, useState } from "react";
import "../../styles/EditProfile.css"

export default function EditProfile({userInfo,setUserInfo}) {
    const [stateMsg, setStateMsg ] = useState(null);
    const [myAccountInfo, setMyAccountInfo] = useState(userInfo);
    useEffect(()=>{
        setMyAccountInfo(userInfo);
    },[userInfo])

    const handelChange= (e)=>{
        setMyAccountInfo({...myAccountInfo, [e.target.name]: e.target.value});
    }

    const handelSubmit = (e)=>{
        e.preventDefault();
       
        updateUser(e)
    }
    const updateUser = async function (e) {
        let formData = new FormData(e.target);
        formData.append("controller", "UsersController");
        formData.append("action", "updateUser");
        let options = {
            method: "post",
            credentials: "include",
            body: formData
        };
        const request = await fetch("https://urtubeback.herokuapp.com/index.php",options)
        if (request.status !== 500) {
          const response = await request.json();
          document.cookie = "userInfo=" + JSON.stringify(response);
          
          setUserInfo(response);
          setStateMsg("user bien actualisé!")
        }
    
    }
    return (
        <div className="editPopup visible" id="editPopup">
            <div className="thePopup" id="thePopup">

                <div className="title">
                    <h2>Détails du compte</h2>
                    <p>{stateMsg}</p>
                </div>
                <div className="body">
                    <form action="" id="editPopupForm" onSubmit={handelSubmit}>
                        <div className="head user">
                            <div className="leftEdit">
                                <div className="sender">
                                    <label htmlFor="">Pseudo :</label>
                                    <input id="pseudo" name="pseudo" type="text" onChange={handelChange} value={myAccountInfo.pseudo} required />
                                    <input id="idUser" type="hidden" name="idUser" value={myAccountInfo.idUser} />
                                </div>
                                <div className="email">
                                    <label htmlFor="">Email :</label>
                                    <input id="email" name="email" type="email" onChange={handelChange} value={myAccountInfo.email} required />
                                </div>
                                <div className="nom">
                                    <label htmlFor="">Nom</label>
                                    <input id="firstname" name="firstname" type="text" onChange={handelChange} value={myAccountInfo.firstname} required />
                                </div>
                                <div className="prénom">
                                    <label htmlFor="">Prénom</label>
                                    <input id="lastname" name="lastname" type="text" onChange={handelChange} value={myAccountInfo.lastname} required />
                                </div>
                                <div className="pwd">
                                    <label htmlFor="">Pwd : </label>
                                    <input id="pwd" name="pwd" type="password" onChange={handelChange}/>
                                </div>
                            </div>
                            <div className="rightEdit">
                                <div className="photo">
                                    <img id="photo" src={"https://urtubeback.herokuapp.com/public/articlefile/"+myAccountInfo.photo} alt="" srcSet="" data-src="account_default.png" />
                                </div>
                                <div className="fileUpload">
                                    <input className="form-control" type="file" id="file" name="file" />
                                </div>
                            </div>

                        </div>

                        <div className="editButton">
                            <button name="updateButton" id="updateButton">Update</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}