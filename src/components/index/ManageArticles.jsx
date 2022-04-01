import "../../styles/index/body.css"
import React from "react";
import Cardsmanager from "../CardsManager"
function ManageArticles() {

    return (
        <div className="manageArticles">
            <Cardsmanager>
                <div className="editBtn">
                    <button type="button" className="btn btn-primary">Edit</button>
                    <button type="button" className="btn btn-danger">Delete</button>
                </div>
            </Cardsmanager>
        </div>
    )
}

export default ManageArticles