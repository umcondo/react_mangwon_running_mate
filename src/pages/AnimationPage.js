const AnimationPage = () => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <div className="result_animation">
      <div className="Animation result_container">
        {/* <!-- 몸 전체 --> */}
        <img src={env.PUBLIC_URL + "/assets/image/man.png"} alt="" />
        {/* <!-- 팔 --> */}
        <div className="hand1">
          <img src={env.PUBLIC_URL + "/assets/image/hand1.png"} alt="" />
        </div>
        <div className="hand2">
          <img src={env.PUBLIC_URL + "/assets/image/hand2.png"} alt="" />
        </div>
        {/* <!-- 다리 --> */}
        <div className="thigh-1">
          <img src={env.PUBLIC_URL + "/assets/image/foot1-1.png"} alt="" />
          <div className="calf-1">
            <img src={env.PUBLIC_URL + "/assets/image/leg.png"} alt="" />
            <div className="ankle-1">
              <img src={env.PUBLIC_URL + "/assets/image/foot2-3.png"} alt="" />
              <div className="toe-1">
                <img
                  src={env.PUBLIC_URL + "/assets/image/foot1-3.png"}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="thigh-2">
          <img src={env.PUBLIC_URL + "/assets/image/foot2-1.png"} alt="" />
          <div className="calf-2">
            <img src={env.PUBLIC_URL + "/assets/image/leg.png"} alt="" />
            <div className="ankle-2">
              <img src={env.PUBLIC_URL + "/assets/image/foot2-3.png"} alt="" />
              <div className="toe-2">
                <img
                  src={env.PUBLIC_URL + "/assets/image/foot2-4.png"}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1>코스 결과를 받아오는 중...</h1>
    </div>
  );
};

export default AnimationPage;
