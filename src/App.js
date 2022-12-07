import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import InputWord from "./components/inputWord";
import Game from "./components/game";
function App() {
  const [answer, setAnswer] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputWord setAnswer={setAnswer} />} />
        <Route path="/game" element={<Game answer={answer} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
