import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../styles/App.css';
import Header from './Header';
import AddNewArticlePage from './index/AddNewArticlePage';
import Bodycontent from './index/body';
import EditArticlePage from './index/EditArticlePage';
import ManageArticles from './index/ManageArticles';
import RegisterPage from './index/RegisterPage';
import SearchPage from './index/SearchPage';
let t = 6

function App() {
  
  const [userInfo, setUserInfo] = useState(false);
  const [articlesInfo, setArticleInfo] = useState([]);
  let [cardsVisibility,setCardsVisiblity] = useState(6);
  if (cardsVisibility ===6) { t=cardsVisibility}
  const incrementCardVisibility = ()=>{
    t += 3;
    console.log(t);
    setCardsVisiblity(t);
  }
  const checkCookie = () => {
    //récupération des donnés session eventuelles de l'utilisateur.
    let cookieInfo = decodeURIComponent(document.cookie).split(";");
    let userInfoTmp = { isConnected: false };
    for (let i = 0; i < cookieInfo.length; i++) {
      let c = cookieInfo[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf("userInfo=") === 0) {
        userInfoTmp = JSON.parse(c.substring("userInfo=".length, c.length));
      }
    }
    if (Object.keys(userInfoTmp).length === 0) {
      userInfoTmp = { isConnected: false }
    }
    setUserInfo(userInfoTmp);
  }
  useLayoutEffect(()=>{
    async function getAllArticle(){
      const request = await fetch("http://localhost:3000/index.php?controller=ArticlesController&action=getallarticles")
      if (request.status !==500){
        const response = await request.json();
        setArticleInfo(response);
      }
    }
    getAllArticle();
  },[])
  useEffect(() => {
    checkCookie();
    window.addEventListener("scroll", handelScroll)
  }, [])
  const handelScroll =()=>{
    // console.log((window.innerHeight+window.scrollY)/document.body.offsetHeight)
    // console.log(window.pageYOffset)
    if (((window.innerHeight+window.scrollY)/document.body.offsetHeight)>1){
      incrementCardVisibility();
    }
  }

  


  return (
    <BrowserRouter>
      <Header userInfo={userInfo} setUserInfo={(data) => { setUserInfo(data) }} checkCookie={checkCookie} tag={articlesInfo}/>
      <Routes>
        <Route path='/' element={<Bodycontent allArticles={articlesInfo} cardsVisibility1={cardsVisibility} setCardsVisiblity1={setCardsVisiblity} />} />
        <Route path='/managearticles/' element={<ManageArticles />} />
        <Route path='/searchpage/' element={<SearchPage allArticles={articlesInfo} cardsVisibility1={cardsVisibility} setCardsVisiblity1={setCardsVisiblity} />} />
        <Route path='/editarticlepage/' element={<EditArticlePage />} />
        <Route path='/addnewarticlepage/' element={<AddNewArticlePage userInfo={userInfo} />} />
        <Route path='/registerpage/' element={<RegisterPage userInfo={userInfo} setUserInfo={(data) => { setUserInfo(data) }} />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
