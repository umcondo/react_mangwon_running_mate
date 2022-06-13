import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* 컴포넌트 */
import Progress from "../components/questionPage/Progress";
import QuestionContent from "../components/questionPage/QuestionContent";
import BackButton from "../components/questionPage/BackButton";

/* 데이터 */
import { Question } from "../util/data";

const QuestionPage = ({ resultBox, setResultBox }) => {
  // state : questionNum : 1(default), 2, 3
  // state에 따라 달라지는 것 : 진행바, 진행이미지, 질문이미지, 질문제목, 질문내용

  // 리액트는 데이터 흐름이 단방향(위에서 아래로)

  // 질문갯수;
  const questionCount = Question.length;

  // 현재 질문인덱스 (기본값 1)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);

  // 현재 질문
  const currentQuestion = Question[currentQuestionIndex - 1];

  // 현재 질문 내용
  const curImg = currentQuestion.img;
  const curTitle = currentQuestion.question;
  const curAnswer1 = currentQuestion.answer[0].text;
  const curAnswer2 = currentQuestion.answer[1].text;

  const nextQuestion = (e) => {
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);

    let targetValue = e.target.textContent;
    questionBox(targetValue);

    if (currentQuestionIndex === questionCount) {
      setCurrentQuestionIndex(1);
      return resultAnimation();
    }
  };

  const questionBox = (targetValue) => {
    let curValue1 = currentQuestion.answer[0].value[0];
    let curValue2 = currentQuestion.answer[1].value[0];

    if (targetValue.slice(0, 3) === curAnswer1.slice(0, 3)) {
      setResultBox([...resultBox, curValue1]);
    } else {
      setResultBox([...resultBox, curValue2]);
    }
  };

  const navigate = useNavigate();
  const resultAnimation = () => {
    navigate("/result");
  };

  // 뒤로가기 버튼 : state를 -1 한다.
  const backwardBtn = () => {
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex - 1);
    setResultBox(resultBox.slice(0, resultBox.length - 1));
  };

  return (
    <div className="question_container">
      {/* <!-- 진행바 --> */}
      <Progress
        currentQuestionIndex={currentQuestionIndex}
        questionCount={questionCount}
      />

      {/* <!-- 질문내용 --> */}
      <QuestionContent
        questionBox={questionBox}
        nextQuestion={nextQuestion}
        curImg={curImg}
        curTitle={curTitle}
        curAnswer1={curAnswer1}
        curAnswer2={curAnswer2}
      />
      {/* <!-- 뒤로가기 --> */}
      <BackButton
        currentQuestionIndex={currentQuestionIndex}
        backwardBtn={backwardBtn}
      />
    </div>
  );
};

export default QuestionPage;
