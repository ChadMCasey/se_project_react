import "../blocks/Header.css";
import "../blocks/HeaderHamburger.css";
import "../blocks/HeaderHamburgerModal.css";
import AvatarImage from "../assets/Avatar.png";
import Logo from "../assets/Logo.svg";

function Header({ location, onOpen, onClose, mobileModal, activeModal }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <header className="header">
        <div className="header__section">
          <img className="header__logo" src={Logo} alt="Logo" />
          <h2 className="header-text  header__text_datelocation">
            {currentDate}, {location}
          </h2>
        </div>
        <div className="header__section header__section-desktop">
          <h2
            className="header-text header__text-add"
            onClick={() => onOpen("add-modal")}
          >
            + Add clothes
          </h2>
          <h2 className="header-text header__text-name">Terrance Tegegne</h2>
          <img
            className="header__avatar"
            src={AvatarImage}
            alt="Avatar Image"
          />
        </div>
        <div
          className="header__section header__section-mobile header-hamburger"
          onClick={() => onOpen("hamburger-modal")}
        >
          <div className="header-hamburger__container">
            <span className="header-hamburger__bar"></span>
            <span className="header-hamburger__bar"></span>
          </div>
        </div>
      </header>

      {/* date location moves below the logo (<=790px) */}
      <div className="header__section header__section-mobile">
        <h2 className="header-text">
          {currentDate}, {location}
        </h2>
      </div>

      {/* hamburger menu (<=790px) */}
      <div
        className={`hamburger-modal modal_type_${mobileModal} ${
          activeModal === "hamburger-modal" && "hamburger_opened"
        }`}
      >
        <div className="hamburger-modal__user">
          <h2 className="header-text hamburger-modal__name">
            Terrance Tegegne
          </h2>
          <img
            className="header__avatar"
            src={AvatarImage}
            alt="Avatar Image"
          />
        </div>
        <h2
          className="header-text hamburger-modal__add"
          onClick={() => onOpen("add-modal")}
        >
          + Add clothes
        </h2>
        <button
          className="hamburger-modal__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </>
  );
}

export default Header;
