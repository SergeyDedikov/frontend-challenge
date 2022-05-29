import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import api from "../../utils/api";
import CatsList from "../CatsList/CatsList";
import NavBar from "../NavBar/NavBar";

export default function App() {
  const [onLoad, setOnLoad] = useState(false);
  const [cats, setCats] = useState([]);
  const [favoriteCats, setFavoriteCats] = useState([]);

  useEffect(() => {
    api
      .getData()
      .then((data) => {
        setCats(data);
        setOnLoad(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return onLoad ? (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<CatsList cats={cats} />} />
          <Route
            path="/favorite-cats"
            element={<CatsList cats={favoriteCats} />}
          />
        </Routes>
      </main>
    </>
  ) : (
    <p>Загрузка...</p>
  );
}
