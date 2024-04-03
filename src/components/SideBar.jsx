import React, { useContext } from "react";
import "../blocks/Profile.css";
import AvatarImage from "../assets/Avatar.png";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/Avatar.css";
import "../blocks/UserProfileSettings.css";
import UserProfileSettings from "./UserProfileSettings";

const SideBar = ({ onOpen, handleLogout }) => {
  const { userData } = useContext(CurrentUserContext);
  return (
    <section className="profile__sidebar">
      <section className="profile__sidebar-user">
        {userData.avatar ? (
          <img
            className="avatar profile__avatar"
            src={userData.avatar}
            alt="Avatar Image"
          />
        ) : (
          <div className="avatar avatar_default profile__avatar_default">
            {userData.name && userData.name[0]}
          </div>
        )}
        <h2 className="profile-text profile__name">{userData.name}</h2>
      </section>
      <section className="profile__sidebar-user-settings">
        <UserProfileSettings onOpen={onOpen} handleLogout={handleLogout} />
      </section>
    </section>
  );
};

export default SideBar;
