import "../blocks/ItemCard.css";
import heart from "../assets/Heart.svg";

function ItemCard({ item, setCurrentCard, onOpen }) {
  function cardClick() {
    setCurrentCard({ ...item });
    onOpen("card-modal");
  }

  function cardHeart(e) {
    e.stopPropagation();
    e.target.classList.toggle("card__heart-liked");
  }

  return (
    <li className="card" onClick={cardClick}>
      <img className="card__image" src={item.imageUrl} alt={item.name} />
      <div className="card__overlay-elements">
        <h3 className="card__title">{item.name}</h3>
        <img
          className="card__heart"
          src={heart}
          alt="Card Heart"
          onClick={cardHeart}
        />
      </div>
    </li>
  );
}

export default ItemCard;
