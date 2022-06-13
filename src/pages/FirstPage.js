// 컴포넌트
import AnimationContainer from "./../components/firstPage/Animation";
import Footer from "./../components/firstPage/Footer";
import Main from "./../components/firstPage/Main";

const FirstPage = () => {
  return (
    <div className="first_page">
      <div className="first_page_container">
        {/* 애니메이션 */}
        <AnimationContainer />
        {/* 본문 */}
        <Main />
      </div>
      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default FirstPage;
