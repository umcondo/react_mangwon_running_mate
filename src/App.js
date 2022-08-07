import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* Page */
import FirstPage from "./pages/FirstPage";
import QuestionPage from "./pages/QuestionPage";
import ResultPage from "./pages/ResultPage";

/* Css */
import "./default.css";
import "./result.css";
import "./mobile.css";

const App = () => {
  // 답변을 모아두는 박스
  const [resultBox, setResultBox] = useState([]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
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
