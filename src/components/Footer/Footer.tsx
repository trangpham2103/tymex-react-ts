import css from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={css.footer}>
      <div className={css.waveWrapper}>
        <svg
          viewBox="10 -120 1900 200"
          preserveAspectRatio="none"
          className={css.waveSvg}
        >
          <path
            d="M 7 4 L 178 79 L 256 -49 L 534 -53 L 673 68 L 948 11 L 1106 -58 L 1379 -4 L 1638 -80 L 1913 -3"
            stroke="#666"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </div>

      <div className={css.footerContent}>
        <div className={css.footerSection}>
          <h3>NAVIGATION</h3>
          <ul className={css.footerLinks}>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Whitepaper</a>
            </li>
            <li>
              <a href="#">Marketplace</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </div>

        <div className={css.footerSection}>
          <h3>CONTACT US</h3>
          <div className={css.contactIcons}>
            <a href="#" aria-label="Facebook">
              <div className={css.contactIcon}></div>
            </a>
            <a href="#" aria-label="Email">
              <div className={css.contactIcon}></div>
            </a>
            <a href="#" aria-label="Discord">
              <div className={css.contactIcon}></div>
            </a>
          </div>
        </div>

        <div className={css.footerSection}>
          <h3>NEWSLETTER</h3>
          <form className={css.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              className={css.newsletterInput}
            />
            <button type="submit" className={css.subscribeButton}>
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
