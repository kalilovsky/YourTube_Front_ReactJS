import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import '../styles/App.css';
import Header from './Header';
import AddNewArticlePage from './index/AddNewArticlePage';
import Bodycontent from './index/body';
import EditProfile from './index/EditProfile';
import ManageArticles from './index/ManageArticles';
import OneArticle from './index/OneArticle';
import RegisterPage from './index/RegisterPage';
import SearchPage from './index/SearchPage';
let t = 9

function App() {

  const [userInfo, setUserInfo] = useState(false);
  const [articlesInfo, setArticleInfo] = useState([]);
  const [cardsVisibility, setCardsVisiblity] = useState(9);
  const [tagAndWordSearch, setTagAndWordSearch] = useState({ tagSearch: "", wordSearch: "" });
  if (cardsVisibility === 9) { t = cardsVisibility }
  const incrementCardVisibility = () => {
    t += 3;
    setCardsVisiblity(t);
  }
  const checkCookie = () => {
    //récupération des donnés session eventuelles de l'utilisateur.
    let cookieInfo = decodeURIComponent(document.cookie).split(";");
    console.log(cookieInfo);
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
    console.log(userInfoTmp);
    setUserInfo(userInfoTmp);
  }
  const getAllArticle = async function () {
    const request = await fetch("https://urtubeback.herokuapp.com/index.php?controller=ArticlesController&action=getallarticles")
    if (request.status !== 500) {
      const response = await request.json();
      setArticleInfo(response);
    }

  }
  useLayoutEffect(() => {

    getAllArticle();
  }, [userInfo])
  useEffect(() => {
    checkCookie();
    
    window.addEventListener("scroll", handelScroll)
  }, [])

  const handelScroll = () => {
    if (((window.innerHeight + window.scrollY) / document.body.offsetHeight) > 1) {
      incrementCardVisibility();

    }
  }

  const handelTag = (criteria) => {
    setTagAndWordSearch({ ...tagAndWordSearch, tagSearch: criteria })
  }

  const handelWordSearch = (criteria) => {
    setTagAndWordSearch({ ...tagAndWordSearch, wordSearch: criteria })
  }

  const resetTagAndWord = () => {
    setTagAndWordSearch({ tagSearch: "", wordSearch: "" });

  }
  const incerementView = () => {
    // const changedArticle = articlesInfo.filter(item => {
    //   if (~~item.idArticle === ~~idArticle) {
    //     item.viewCount = ~~item.viewCount + 1;

    //   }
    //   return item;
    // })
  //  setArticleInfo(changedArticle);
  getAllArticle();
  }
  return (
    <BrowserRouter>
      <Header userInfo={userInfo} setUserInfo={(data) => { setUserInfo(data) }} checkCookie={checkCookie} tag={articlesInfo} setWordSearch={handelWordSearch} setTagSearch={handelTag} tagAndWordSearch={tagAndWordSearch} />
      <Routes>
        <Route path='/' element={<Bodycontent incerementView={incerementView} allArticles={articlesInfo} cardsVisibility1={cardsVisibility} setCardsVisiblity1={setCardsVisiblity} />} />
        <Route path='/managearticles/' element={<ManageArticles incerementView={incerementView} userInfo={userInfo} allArticles={articlesInfo} cardsVisibility1={cardsVisibility} setCardsVisiblity1={setCardsVisiblity} getAllArticle={getAllArticle} />} />
        <Route path='/searchpage/' element={<SearchPage allArticles={articlesInfo} cardsVisibility1={cardsVisibility} setCardsVisiblity1={setCardsVisiblity}  tagAndWordSearch={tagAndWordSearch} resetTagAndWord={resetTagAndWord} incerementView1={incerementView} />} />
        <Route path='/searchpage/:tagSearch' element={<SearchPage allArticles={articlesInfo} cardsVisibility1={cardsVisibility} setCardsVisiblity1={setCardsVisiblity} tagAndWordSearch={tagAndWordSearch} resetTagAndWord={resetTagAndWord} incerementView1={incerementView}/>} />
        <Route path='/editmyprofile/' element={<EditProfile userInfo={userInfo} setUserInfo={setUserInfo}/>} />
        <Route path='/addnewarticlepage/' element={<AddNewArticlePage userInfo={userInfo} />} />
        <Route path='/registerpage/' element={<RegisterPage userInfo={userInfo} setUserInfo={(data) => { setUserInfo(data) }} />} />
        <Route path='/OneArticle/:idArticle' element={<OneArticle allArticleInfo={articlesInfo} incerementView={incerementView} />} />
        <Route path='*' element={<Bodycontent allArticles={articlesInfo} cardsVisibility1={cardsVisibility} setCardsVisiblity1={setCardsVisiblity} />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
