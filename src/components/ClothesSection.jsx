import React, { useContext } from "react";
import "../blocks/Profile.css";
import ItemCard from "./ItemCard";
import CurrentUserContext from "../contexts/CurrentUserContext";

const ClothesSection = ({
  clothing,
  setCurrentCard,
  onOpen,
  setActiveModal,
  weather,
  handleCardLike,
}) => {
  const { userData } = useContext(CurrentUserContext);
  return (
    <section className="profile__clothing">
      <div className="profile__clothing-header">
        <h2 className="profile-text profile__clothing-header-text">
          Your Items
        </h2>
        <h2
          className="profile-text profile__items-header-addnew"
          onClick={() => setActiveModal("add-modal")}
        >
          + Add new
        </h2>
      </div>
      <div className="profile__clothing-items">
        <ul className="card-items__list">
          {clothing.length > 0 &&
            clothing
              .filter((image) => {
                return image.weather == weather && image.owner === userData._id;
              })
              .map((item) => (
                <ItemCard
                  item={item}
                  key={item._id}
                  setCurrentCard={setCurrentCard}
                  onOpen={onOpen}
                  handleCardLike={handleCardLike}
                />
              ))}
        </ul>
      </div>
    </section>
  );
};

export default ClothesSection;
