import "../blocks/Header.css";
import "../blocks/HeaderHamburger.css";
import "../blocks/HeaderHamburgerModal.css";
import ToggleSwitch from "./ToggleSwitch";
import Logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";
import HeaderAuthSection from "./HeaderAuthSection";
import HeaderProfileSection from "./HeaderProfileSection";
import "../blocks/Avatar.css";
import HeaderHamburger from "./HeaderHamburger";
import "../blocks/Avatar.css";
import { pencil } from "../utils/constants";

function Header({
  location,
  onOpen,
  onClose,
  mobileModal,
  activeModal,
  handleLogout,
}) {
  const { isLoggedIn, userData } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  function handleAddItemModalOpen() {
    onOpen("add-modal");
  }

  return (
    <>
      <header className="header">
        <div className="header__section">
          <Link to="/">
            <img className="header__logo" src={Logo} alt="Logo" />
          </Link>

          <h2 className="header-text  header__text_datelocation">
            {currentDate}, {location}
          </h2>
          <img
            src={pencil}
            onClick={() => onOpen("edit-location-modal")}
            alt="Edit Location Pencil"
            className="header__location-edit header__text_datelocation"
          />
        </div>
        <div className="header__section header__section-desktop">
          <div className="header__toggle">
            <ToggleSwitch />
          </div>
          {isLoggedIn && (
            <h2
              className="header-text header__text-add"
              onClick={handleAddItemModalOpen}
            >
              + Add clothes
            </h2>
          )}

          {isLoggedIn ? (
            <HeaderProfileSection onClose={onClose} />
          ) : (
            <HeaderAuthSection onOpen={onOpen} />
          )}
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
          <img
            src={pencil}
            onClick={() => onOpen("edit-location-modal")}
            alt="Edit Location Pencil"
            className="header__location-edit"
          />
        </h2>
      </div>

      {/* hamburger menu (<=790px) */}
      <HeaderHamburger
        activeModal={activeModal}
        onOpen={onOpen}
        onClose={onClose}
        mobileModal={mobileModal}
        handleLogout={handleLogout}
        handleAddItemModalOpen={handleAddItemModalOpen}
      />
    </>
  );
}

export default Header;
