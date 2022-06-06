const BackButton = ({ currentQuestionIndex, backwardBtn }) => {
  return (
    <div
      className={
        "question_btn_box " + (currentQuestionIndex === 1 ? "hidden" : "")
      }
    >
      <button className="question_back_btn" onClick={backwardBtn}>
        <span>&lt;</span> 뒤로가기
      </button>
    </div>
  );
};

export default BackButton;
