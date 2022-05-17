const Animation = () => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <div className="Animation">
      {/* <!-- 몸 전체 --> */}
      <img src={env.PUBLIC_URL + "/assets/image/body/man.png"} alt="" />
      {/* <!-- 팔 --> */}
      <div className="hand1">
        <img src={env.PUBLIC_URL + "/assets/image/body/hand1.png"} alt="" />
      </div>
      <div className="hand2">
        <img src={env.PUBLIC_URL + "/assets/image/body/hand2.png"} alt="" />
      </div>
      {/* <!-- 다리 --> */}
      <div className="thigh-1">
        <img src={env.PUBLIC_URL + "/assets/image/body/foot1-1.png"} alt="" />
        <div className="calf-1">
          <img src={env.PUBLIC_URL + "/assets/image/body/leg.png"} alt="" />
          <div className="ankle-1">
            <img
              src={env.PUBLIC_URL + "/assets/image/body/foot2-3.png"}
              alt=""
            />
            <div className="toe-1">
              <img
                src={env.PUBLIC_URL + "/assets/image/body/foot1-3.png"}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="thigh-2">
        <img src={env.PUBLIC_URL + "/assets/image/body/foot2-1.png"} alt="" />
        <div className="calf-2">
          <img src={env.PUBLIC_URL + "/assets/image/body/leg.png"} alt="" />
          <div className="ankle-2">
            <img
              src={env.PUBLIC_URL + "/assets/image/body/foot2-3.png"}
              alt=""
            />
            <div className="toe-2">
              <img
                src={env.PUBLIC_URL + "/assets/image/body/foot2-4.png"}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animation;
