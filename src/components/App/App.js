import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import api from "../../utils/api";
import CatsList from "../CatsList/CatsList";
import NavBar from "../NavBar/NavBar";

export default function App() {
  const [onLoad, setOnLoad] = useState(false);
  const [cats, setCats] = useState([]);

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
    <p>Загрузка...</p>
  );
}
