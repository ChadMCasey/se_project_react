import React from "react";
import "../blocks/Profile.css";
import "../blocks/ItemCard.css";
import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";

const Profile = (props) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection {...props} />
    </div>
  );
};

export default Profile;
