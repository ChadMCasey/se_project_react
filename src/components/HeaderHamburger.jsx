import React, { useContext } from "react";
import HeaderAuthSection from "./HeaderAuthSection";
import HeaderProfileSection from "./HeaderProfileSection";
import CurrentUserContext from "../contexts/CurrentUserContext";
import UserProfileSettings from "./UserProfileSettings";
import "../blocks/Header.css";

const HeaderHamburger = ({
  handleAddItemModalOpen,
  mobileModal,
  onClose,
  onOpen,
  activeModal,
  handleLogout,
}) => {
  const { isLoggedIn } = useContext(CurrentUserContext);
  return (
    <div
      className={`hamburger-modal modal_type_${mobileModal} ${
        activeModal === "hamburger-modal" && "hamburger_opened"
      }`}
    >
      {isLoggedIn ? (
        <>
          <HeaderProfileSection />
          <section className="hamburger-modal_user-settings">
            <UserProfileSettings onOpen={onOpen} handleLogout={handleLogout} />
          </section>

          <h2
            className="header-text hamburger-modal__add"
            onClick={handleAddItemModalOpen}
          >
            + Add clothes
          </h2>
        </>
      ) : (
        <HeaderAuthSection onOpen={onOpen} />
      )}

      <button
        className="hamburger-modal__close"
        type="button"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default HeaderHamburger;
