const Progress = ({ currentQuestionIndex, questionCount }) => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const progressText = `${currentQuestionIndex} / ${questionCount}`;
  const progressImage = `${
    ((currentQuestionIndex - 1) / (questionCount - 1)) * 100
  }%`;

  return (
    <div className="progress">
      <div className="progress-text">{progressText}</div>
      <div className="progress-bar">
        <div
          className="progress-image"
          style={{
            width: progressImage,
          }}
        >
          <img src={env.PUBLIC_URL + "/assets/image/run-icon.png"} alt="run" />
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  currentQuestionIndex: 1,
};

export default Progress;
