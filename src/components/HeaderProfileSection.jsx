import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../blocks/Avatar.css";

const HeaderProfileSection = () => {
  const { userData } = useContext(CurrentUserContext);
  return (
    <Link to="/profile" className="header__profile header_profile_desktop">
      <h2 className="header-text header__text-name">{userData.name}</h2>
      {userData.avatar ? (
        <img className="avatar" src={userData.avatar} alt="Avatar Image" />
      ) : (
        <div className="avatar avatar_default">
          {userData.name && userData.name[0]}
        </div>
      )}
    </Link>
  );
};

export default HeaderProfileSection;
