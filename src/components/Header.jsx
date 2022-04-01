import "../styles/header.css";
import down from "../assets/caret-down-solid.svg";
import youtubeLogo from "../assets/youtube-logo.svg";
import SearchBar  from "./Searchbar";
import Scrollmenu from "./Scrollmenu"
import { useState } from "react";
import React,{useEffect} from "react";
import DecodeEntity from "./decodeHtml";

function Header({userInfo, setUserInfo, checkCookie,tag}) {
    const [scrollMenuClass,scrollMenuToggle] = useState("")
    const [myTag,setTag]=useState({});
    let test3 =[]
    const scrollMenuVisibilityHandle = ()=>{
        if(scrollMenuClass.length===0){
            scrollMenuToggle(" active")
            
        }else{
            window.scrollTo(0,0)
            scrollMenuToggle("")
        }
    }

    useEffect(()=>{
        let tmpObj =""
        let test = []
        tmpObj += tag.map(x=>x.tag)
        tmpObj = DecodeEntity(tmpObj)
        tmpObj = tmpObj.replaceAll(";"," ")
        tmpObj = tmpObj.replaceAll(","," ")
        let tmp = tmpObj.split(' ')
        const countOccurrences = (arr, val) =>{
           return arr.reduce((a, v) =>{
                if (v===val){
                    return test[val] = a+1
                } else {
                    return test[val] = a
                }
            }, 0);
        }
        let tagCount = [...tmp.map(x=>{
            return countOccurrences(tmp,x);
        })]
        let keys = Object.keys(test);
        let test2 = keys.sort((a,b)=>-test[a]+test[b]);
        
        for (let i = 0; i<15;i++){
            test3[test2[i]] = test[test2[i]]
        }
        handleTag(test3);
        console.log("render")
    },[tag])
    const handleTag = (array)=>{
        setTag(test3)
    //    setTimeout(()=>console.log(myTag),2000);
    };
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <a className="gauche">
                            <span className="icon">
                            <img src={youtubeLogo} alt="test"></img>
                            </span>
                            
                        </a>
                    </li>
                    <li>
                        <SearchBar/>
                    </li>
                    <li>
                        <a onClick={scrollMenuVisibilityHandle} className="droite">
                            <span className="icon">
                            <img src={down} alt="test"></img>

                            </span>
                            <span className="titre">{userInfo.isConnected == true ? userInfo.pseudo : "connexion" }</span>
                        </a>
                    </li>
                </ul>
            <div className="tagSection">
                <ul>
                 {Object.keys(myTag).length>0 && Object.keys(myTag).map((x)=><li>{x + " " + myTag[x]}</li>) }
                    
                </ul>
            </div>
            </nav>
        <Scrollmenu namedClass={scrollMenuClass} changeVisibility={scrollMenuVisibilityHandle} userInfo={userInfo} setUserInfo={setUserInfo} checkCookie={checkCookie}/>
        </header>
    )
}

export default Header;