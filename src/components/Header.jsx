import "../blocks/Header.css";
import AvatarImage from "../assets/Avatar.png";
import Logo from "../assets/Logo.svg";

function Header({ location, onOpen }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__section">
        <img className="header__logo" src={Logo} alt="Logo" />
        <h2 className="header__text">
          {currentDate}, {location}
        </h2>
      </div>

      <div className="header__section">
        <h2
          className="header__text header__text-add"
          onClick={() => onOpen("add-modal")}
        >
          + Add clothes
        </h2>
        <h2 className="header__text header__text-name">Terrance Tegegne</h2>
        <img className="header__avatar" src={AvatarImage} alt="Avatar Image" />
      </div>
    </header>
  );
}

export default Header;
