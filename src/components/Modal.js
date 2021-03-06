import copy from "copy-to-clipboard";
import { useLocation } from "react-router-dom";

const ModalContent = ({ clickFunc, imgSrc, modalContentText }) => {
  return (
    <div className="modal_content">
      <img onClick={clickFunc} src={imgSrc} alt="링크복사" />
      <span onClick={clickFunc}>{modalContentText}</span>
    </div>
  );
};

const Modal = ({ control, modalBtn }) => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  // 카카오 SDK 전역객체에서 가져오기
  const { Kakao } = window;

  // 공유하기 - 카카오톡
  function kakaoSendLink() {
    if (!Kakao.isInitialized()) Kakao.init("16c159fd8e6cf9b9dc0f34f5922c2f5a");

    // Kakao.Link.sendDefault({
    //   objectType: "text",
    //   text: "망원런닝메이트!!",
    //   link: {
    //     mobileWebUrl: "https://developers.kakao.com",
    //     webUrl: "https://developers.kakao.com",
    //   },
    // });
    Kakao.Share.sendCustom({
      templateId: 79200,
      templateArgs: {
        title: "제목 영역입니다.",
        description: "설명 영역입니다.",
      },
    });
  }

  /* 공유하기 - 현재 링크 복사 */
  // const location = useLocation();
  function clip() {
    // const url = location.pathname;
    // console.log(process.env.PUBLIC_URL + url);
    // console.log(window.document.location.href);
    let url = window.document.location.href;
    copy(url); // copy-to-clipboard 라이브러리를 사용했다.
    alert("복사되었습니다 !");
  }

  // control state가 false면 렌더링 안함
  if (!control) {
    return null;
  }

  return (
    <div onClick={modalBtn} className="result_modal">
      {/* e.stopPropagation() : 이벤트 버블링을 막기 위한 작업 */}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal_container"
      >
        <h3>공유하기</h3>
        <ModalContent
          clickFunc={clip}
          imgSrc={env.PUBLIC_URL + "/assets/image/copy3.png"}
          modalContentText="링크복사"
        />
        <ModalContent
          clickFunc={kakaoSendLink}
          imgSrc={env.PUBLIC_URL + "/assets/image/kakao_logo.png"}
          modalContentText="카카오톡"
        />

        <div onClick={modalBtn} className="modal_exit">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
};

export default Modal;
