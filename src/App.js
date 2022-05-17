import { BrowserRouter, Route, Routes } from "react-router-dom";

/* Page */
import FirstPage from "./Pages/FirstPage";
import QuestionPage from "./Pages/QuestionPage";
import ResultPage from "./Pages/ResultPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
