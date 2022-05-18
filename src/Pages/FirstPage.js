import { useNavigate } from "react-router-dom";

// 컴포넌트
import Animation from "./../Components/Animation";
import Footer from "../Components/Footer";

const FirstPage = () => {
  const navigate = useNavigate();

  const viewQuestion = () => {
    navigate("/question");
  };

  return (
    <div className="first_page">
      <div className="first_page_container">
        {/* 애니메이션 */}
        <div className="first_animation">
          <div className="runner_1">
            <Animation />
          </div>
          <div className="runner_2">
            <Animation />
          </div>
          <div className="runner_3">
            <Animation />
          </div>
        </div>
        {/* 본문 */}
        <h1>망원 런닝 메이트</h1>
        <p>
          내 취향에 맞는 망원, 마포의 <span>런닝 코스</span>를 알아보세요 !!
        </p>
        <button id="start_btn" onClick={viewQuestion}>
          러닝 코스 추천 시작하기
        </button>
      </div>
      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default FirstPage;
