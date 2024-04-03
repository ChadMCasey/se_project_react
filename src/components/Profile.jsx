import React from "react";
import "../blocks/Profile.css";
import "../blocks/ItemCard.css";
import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";

const Profile = (props) => {
  return (
    <div className="profile">
      <SideBar onOpen={props.onOpen} handleLogout={props.handleLogout} />
      <ClothesSection {...props} handleCardLike={props.handleCardLike} />
    </div>
  );
};

export default Profile;
