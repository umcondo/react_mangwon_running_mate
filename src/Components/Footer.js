const Footer = () => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <footer>
      <div className="desktop_footer">
        <div className="footer-info">
          <img src="assets/image/mapo_logo_footer.svg" alt="" width="100px" />
          <h3>망원 런닝 메이트</h3>
        </div>
        <div className="footer-info">
          <p>
            03965 서울특별시 마포구 성산로4길 53(성산동)
            <br />
            TEL) 02-3153-8555 <br />
            created by <b>KangDaeguk</b> | all rights reserved
          </p>
        </div>
        <div className="footer-sns">
          <a
            href="https://www.facebook.com/mapoguoffice"
            target="_blank "
            rel="noreferrer"
          >
            <img src={env.PUBLIC_URL + "/assets/image/fb_ico.png"} alt="" />
          </a>
          <a href="https://twitter.com/prmapo" target="_blank" rel="noreferrer">
            <img src={env.PUBLIC_URL + "/assets/image/tt_ico.png"} alt="" />
          </a>
          <a
            href="https://blog.naver.com/prmapo77"
            target="_blank"
            rel="noreferrer"
          >
            <img src={env.PUBLIC_URL + "assets/image/blog_ico.png"} alt="" />
          </a>
        </div>
      </div>
      <div className="mobile_footer">
        <div className="footer-info">
          <img src="assets/image/mapo_logo_footer.svg" alt="" width="100px" />
          <h3>마포구</h3>
        </div>
        <div className="mobile_footer_info">
          <h3>망원 런닝 메이트</h3>
          <p>
            created by <b>KangDaeguk</b> <span>| all rights reserved</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
