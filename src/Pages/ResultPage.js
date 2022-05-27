import { useNavigate } from "react-router-dom";
import { useState } from "react";

// data
import { CourseData, coordinates } from "../util/data";

// 컴포넌트
import KakaoMap from "../Components/KakaoMap";
import Modal from "../Components/Modal";
import AnimationPage from "./AnimationPage";

const ResultPage = ({ resultBox, setResultBox }) => {
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

  let resultIndex = resultValue();
  // 새로고침해도 데이터를 저장하기 위해 로컬스토리지를 활용
  // 데이터가 없으면 로컬스토리지에서 가져온다.
  // 데이터가 있으면 로컬스토리지에 저장한다.
  if (resultIndex) {
    localStorage.setItem("resultIndex", resultIndex);
  } else {
    resultIndex = +localStorage.getItem("resultIndex");
  }

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

  const [control, setControl] = useState(false);
  // 공유하기 모달
  const modalBtn = () => {
    return setControl(!control);
  };

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
      <KakaoMap coordinates={coordinates} resultIndex={resultIndex} />
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
        <button onClick={modalBtn}>공유하기</button>
      </div>
      {/* <!-- 공유하기 모달창 --> */}
      <Modal control={control} modalBtn={modalBtn} />
    </div>
  );
};

export default ResultPage;
