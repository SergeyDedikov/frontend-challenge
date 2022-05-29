import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import api from "../../utils/api";

export default function App() {
  const [onLoad, setOnLoad] = useState(false);
  const [cats, setCats] = useState([]);
  const [favoriteCats, setFavoriteCats] = useState([]);

  useEffect(() => {
    setOnLoad(true);
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
            element={<CatsList favoriteCats={favoriteCats} />}
          />
        </Routes>
      </main>
    </>
  ) : (
    <p>Загрузка...</p>
  );
}
