import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* 컴포넌트 */
import Progress from "../Components/Progress";
import QuestionContent from "../Components/QuestionContent";

/* 데이터 */
import { Question } from "./../util/data";

// 답변을 모아두는 박스
const resultBox = [];

const QuestionPage = () => {
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
    setCurrentQuestionIndex(currentQuestionIndex + 1);

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

    targetValue.slice(0, 3) === curAnswer1.slice(0, 3)
      ? resultBox.push(curValue1)
      : resultBox.push(curValue2);
  };

  const navigate = useNavigate();
  const resultAnimation = () => {
    navigate("/result");
    console.log(resultBox);
  };

  // 뒤로가기 버튼 : state를 -1 한다.
  const backwardBtn = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    resultBox.pop();
  };
  return (
    <div className="question_container">
      {/* <!-- 진행바 --> */}
      <header>
        <Progress
          currentQuestionIndex={currentQuestionIndex}
          questionCount={questionCount}
        />
      </header>
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
      <div
        className="question_btn_box"
        style={{
          visibility: currentQuestionIndex === 1 ? "hidden" : "visible",
        }}
      >
        <button className="question_back_btn" onClick={backwardBtn}>
          <span>&lt;</span> 뒤로가기
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
