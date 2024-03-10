import "../blocks/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__text">Developed By Chad Casey</h3>
      <h3 className="footer__text">{new Date().getFullYear()}</h3>
    </footer>
  );
}

export default Footer;
