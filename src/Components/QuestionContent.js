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

  // 데이터 조작
  const [curAnswer1Text1, curAnswer1Text2] = curAnswer1.split("<br>");
  const [curAnswer2Text1, curAnswer2Text2] = curAnswer2.split("<br>");

  const [titleText1, titleText2, titleText3] =
    curTitle.split(/<span>|<\/span>/g);

  return (
    <div className="question_content">
      <img className="question_img" src={env.PUBLIC_URL + curImg} alt="" />
      <div className="question_head">
        <h1>
          {titleText1}
          <span>{titleText2}</span>
          {titleText3}
        </h1>
      </div>
      <div className="question_text_box">
        <div className="question_text" onClick={nextQuestion} ref={resultInput}>
          {curAnswer1Text1}
          <br />
          {curAnswer1Text2}
        </div>
        <div className="question_text" onClick={nextQuestion} ref={resultInput}>
          {curAnswer2Text1}
          <br />
          {curAnswer2Text2}
        </div>
      </div>
    </div>
  );
};

export default QuestionContent;
