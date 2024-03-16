import React from "react";
import "../blocks/Profile.css";
import ItemCard from "./ItemCard";

const ClothesSection = ({ images, setCurrentCard, onOpen }) => {
  return (
    <section className="profile__clothing">
      <div className="profile__clothing-header">
        <h2 className="profile-text profile__clothing-header-text">
          Your Items
        </h2>
        <h2 className="profile-text profile__items-header-addnew">+ Add new</h2>
      </div>

      <div className="profile__clothing-items">
        <ul className="card-items__list">
          {images
            // .filter((image) => image.weather == weather)
            .map((image) => (
              <ItemCard
                image={image}
                key={image._id}
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
