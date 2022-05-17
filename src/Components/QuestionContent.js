import { useRef } from "react";

const QuestionContent = ({
  nextQuestion,
  curImg,
  curTitle,
  curAnswer2,
  curAnswer1,
}) => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const resultInput = useRef();

  return (
    <div className="question_content">
      <img className="question_img" src={env.PUBLIC_URL + curImg} alt="" />
      <div className="question_head">
        <h1>{curTitle}</h1>
      </div>
      <div className="question_text_box">
        <div className="question_text" onClick={nextQuestion} ref={resultInput}>
          {curAnswer1}
        </div>
        <div className="question_text" onClick={nextQuestion} ref={resultInput}>
          {curAnswer2}
        </div>
      </div>
    </div>
  );
};

export default QuestionContent;
