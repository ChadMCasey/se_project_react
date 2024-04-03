import React from "react";

const UserProfileSettings = ({ onOpen, handleLogout }) => {
  return (
    <>
      <h2
        className="user-settings__heading"
        onClick={() => onOpen("edit-profile-modal")}
      >
        Change Profile Data
      </h2>
      <h2 className="user-settings__heading" onClick={handleLogout}>
        Log Out
      </h2>
    </>
  );
};

export default UserProfileSettings;
