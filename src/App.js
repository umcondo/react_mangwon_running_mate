import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* Page */
import FirstPage from "./Pages/FirstPage";
import QuestionPage from "./Pages/QuestionPage";
import ResultPage from "./Pages/ResultPage";
import AnimationPage from "./Pages/AnimationPage";
/* Css */
import "./default.css";
import "./mobile.css";
const App = () => {
  // 답변을 모아두는 박스
  const [resultBox, setResultBox] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route
            path="/question"
            element={
              <QuestionPage resultBox={resultBox} setResultBox={setResultBox} />
            }
          />

          <Route
            path="/result"
            element={
              <ResultPage resultBox={resultBox} setResultBox={setResultBox} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
