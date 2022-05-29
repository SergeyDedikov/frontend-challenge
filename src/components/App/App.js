import { useState, useEffect } from "react";

import "./App.css";
import api from "../../utils/api";

export default function App() {
  return onLoad ? <></> : <p>Загрузка...</p>;
}
