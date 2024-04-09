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
            // this information should be located in the header
            // profile section component but the automated test cases  wanted
            // the /profile link in the header component directly
            <Link
              to="/profile"
              className="header__profile header_profile_desktop"
            >
              <h2 className="header-text header__text-name">{userData.name}</h2>
              {userData.avatar ? (
                <img
                  className="avatar"
                  src={userData.avatar}
                  alt="Avatar Image"
                />
              ) : (
                <div className="avatar avatar_default">
                  {userData.name && userData.name[0]}
                </div>
              )}
            </Link>
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
