import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import api from "../../utils/api";
import CatsList from "../CatsList/CatsList";
import NavBar from "../NavBar/NavBar";

export default function App() {
  const [onLoad, setOnLoad] = useState(false);
  const [cats, setCats] = useState([]);
  const [countPage, setCountPage] = useState(1);
  const { pathname } = useLocation();
  const [favoriteCats, setFavoriteCats] = useState(
    JSON.parse(localStorage.getItem("cats")) || []
  );

  useEffect(() => {
    api
      .getData()
      .then((data) => {
        setCats(data);
        setOnLoad(true);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleOnLike(selectedCat) {
    // Проверяем, есть ли этот кот среди любимых
    const isLiked = favoriteCats.some((c) => c.id === selectedCat.id);
    // Добавляем, если его нет
    !isLiked && setFavoriteCats([selectedCat, ...favoriteCats]);
  }

  function handleOnDislike(selectedCat) {
    setFavoriteCats((state) => state.filter((c) => c.id !== selectedCat.id));
  }

  useEffect(() => {
    localStorage.setItem("cats", JSON.stringify(favoriteCats));
  }, [favoriteCats]);

  async function addMoreData(page) {
    await api
      .addMoreData(countPage)
      .then((moreCats) => {
        setCats((cats) => cats.concat(moreCats));
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    countPage > 1 && pathname === "/" && addMoreData(countPage);
  }, [countPage]);

  async function handleCount() {
    setCountPage((state) => state + 1);
  }

  function checkPosition() {
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const threshold = height - screenHeight / 4;
    const position = scrolled + screenHeight;
    if (position >= threshold) {
      handleCount();
    }
  }

  function throttle(callee, timeout) {
    let timer = null;
    return function perform(...args) {
      if (timer) return;
      timer = setTimeout(() => {
        callee(...args);
        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  }

  useEffect(() => {
    window.addEventListener("scroll", throttle(checkPosition, 1000));
    window.addEventListener("resize", throttle(checkPosition, 1000));
    return () => {
      window.addEventListener("scroll", null);
      window.addEventListener("resize", null);
    };
  }, []);

  return onLoad ? (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <CatsList
                cats={cats}
                onLikeClick={handleOnLike}
                isLiked={false}
              />
            }
          />
          <Route
            path="/favorite-cats"
            element={
              <CatsList
                cats={favoriteCats}
                onLikeClick={handleOnDislike}
                isLiked={true}
              />
            }
          />
        </Routes>
      </main>
    </>
  ) : (
    <p>Загружаем котиков...</p>
  );
}
