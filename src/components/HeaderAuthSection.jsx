import React from "react";

const HeaderAuthSection = ({ onOpen }) => {
  return (
    <section className={`header__auth-section`}>
      <h2
        className="header-text header__text-signup"
        onClick={() => onOpen("register-modal")}
      >
        Sign Up
      </h2>
      <h2
        className="header-text header__text_signin"
        onClick={() => onOpen("login-modal")}
      >
        Log In
      </h2>
    </section>
  );
};

export default HeaderAuthSection;
