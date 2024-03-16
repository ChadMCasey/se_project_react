import React from "react";
import "../blocks/Profile.css";
import ItemCard from "./ItemCard";

const ClothesSection = ({
  clothing,
  setCurrentCard,
  onOpen,
  setActiveModal,
}) => {
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
              // .filter((image) => image.weather == weather)
              .map((item) => (
                <ItemCard
                  item={item}
                  key={item._id}
                  setCurrentCard={setCurrentCard}
                  onOpen={onOpen}
                />
              ))}
        </ul>
      </div>
    </section>
  );
};

export default ClothesSection;
