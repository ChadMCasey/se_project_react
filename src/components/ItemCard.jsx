import "../blocks/ItemCard.css";
import heart from "../assets/Heart.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ item, setCurrentCard, onOpen, handleCardLike }) {
  const { isLoggedIn, userData } = useContext(CurrentUserContext);

  function cardClick() {
    setCurrentCard({ ...item });
    onOpen("card-modal");
  }

  function cardHeart(e) {
    e.stopPropagation();
    if (isLoggedIn) {
      handleCardLike({
        id: item._id,
        isLiked: item.likes.includes(userData._id),
      });
    }
  }

  return (
    <li className="card" onClick={cardClick}>
      <img className="card__image" src={item.imageUrl} alt={item.name} />
      <div className="card__overlay-elements">
        <h3 className="card__title">{item.name}</h3>
        {isLoggedIn && (
          <img
            className={`card__heart ${
              item.likes.includes(userData._id) && "card__heart-liked"
            }`}
            src={heart}
            alt="Card Heart"
            onClick={cardHeart}
          />
        )}
      </div>
      <p className="card__enlarge">View ➞</p>
    </li>
  );
}

export default ItemCard;
