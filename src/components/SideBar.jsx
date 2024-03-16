import React from "react";
import "../blocks/Profile.css";
import AvatarImage from "../assets/Avatar.png";

const SideBar = () => {
  return (
    <section className="profile__sidebar">
      <img className="profile__avatar" src={AvatarImage} alt="Avatar Image" />
      <h2 className="profile-text profile__name">Terrance Tegegne</h2>
    </section>
  );
};

export default SideBar;
