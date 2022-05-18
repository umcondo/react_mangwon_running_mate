// 컴포넌트
import KakaoMap from "../Components/KakaoMap";
import { useNavigate } from "react-router-dom";
// data
import { CourseData, coordinates } from "../util/data";

const ResultPage = ({ resultBox, setResultBox }) => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  // 난이도 : "beginner - b" , "intermediate - i"
  // 한강, 내륙 : "Hangang" - H , "inland" - i,
  // 혼잡도 : "loud" - l, "quiet"- q

  // 결과값 함수
  const resultValue = () => {
    switch (resultBox.join("")) {
      case "bHl": // 선유도
        return 0;
      case "bHq": // 홍제천
        return 1;
      case "bil": // 경의선
        return 2;
      case "biq": // 당인리
        return 3;
      case "iHl": //마포대교
        return 4;
      case "iHq": // 가양대교
        return 5;
      case "iil": // 마포 한바퀴
        return 6;
      case "iiq": // 난지
        return 7;
      default:
        break;
    }
  };

  const resultIndex = resultValue();

  const course = CourseData[resultIndex];
  const courseDistance = course.courseDistance;
  const courseName = course.courseName;
  const courseInfo = course.courseInfo;
  const courseDestination = course.courseDestination;
  const coursePath = course.coursePath;
  const courseId = course.id;

  const navigate = useNavigate();

  // 데이터 변환
  const courseInfoText = courseInfo
    .split(/\n|<b>|<\/b>|<ul>|<\/ul>|<li>/g)
    .map((elm) => elm.trim())
    .filter((elm) => elm !== "");

  // 다시하기 함수
  const reStartBtn = () => {
    setResultBox([]);
    navigate("/question");
  };

  // 공유하기 모달

  return (
    <div className="result">
      {/* 결과 코스 */}
      <div className="result_head_container">
        <h2 className="result_head">
          <span className="courseNameNum">{courseId + 1}코스</span>
          <span className="courseName">{courseName}</span>
        </h2>
        <h4 className="result_course_destination">
          <span>{courseDestination}</span> | 코스 총거리 :
          <span>{courseDistance}</span>
        </h4>
      </div>
      <h3 className="result_course_path">{coursePath}</h3>
      {/* 카카오맵 */}
      <KakaoMap />

      {/* 코스설명 */}
      <div className="result_text">
        <b>{courseInfoText[0]}</b>
        <ul>
          {courseInfoText
            .filter((elm, idx) => idx !== 0)
            .map((elm, idx) => (
              <li key={idx}>{elm}</li>
            ))}
        </ul>
      </div>

      {/* 버튼 */}
      <div className="result_btn_container">
        <button onClick={reStartBtn}>다시하기</button>
        <button>공유하기</button>
      </div>
      {/* <!-- 공유하기 모달창 --> */}
      <div className="result_modal">
        <div className="modal_container">
          <h3>공유하기</h3>
          <div className="modal_content">
            <img
              src={env.PUBLIC_URL + "/assets/image/copy3.png"}
              alt="링크복사"
            />

            <span>링크복사</span>
          </div>
          <div className="modal_content">
            <img
              src={env.PUBLIC_URL + "/assets/image/kakao_logo.png"}
              alt="카카오톡"
            />
            <span>카카오톡</span>
          </div>
          <div className="modal_exit">
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
