import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const viewQuestion = () => {
    navigate("/question");
  };

  return (
    <>
      <h1>망원 런닝 메이트</h1>
      <p>
        내 취향에 맞는 망원, 마포의 <span>런닝 코스</span>를 알아보세요 !!
      </p>
      <button id="start_btn" onClick={viewQuestion}>
        러닝 코스 추천 시작하기
      </button>
    </>
  );
};

export default Main;
