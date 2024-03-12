import "../blocks/ItemCard.css";
import heart from "../assets/Heart.svg";

function ItemCard({ image, setCurrentCard, onOpen }) {
  // console.log(image);
  return (
    <li
      className="card"
      onClick={() => {
        setCurrentCard({ name: image.name, link: image.link });
        onOpen("card-modal");
      }}
    >
      <img className="card__image" src={image.link} alt={image.name} />
      <div className="card__overlay-elements">
        <h3 className="card__title">{image.name}</h3>
        <img
          className="card__heart"
          src={heart}
          alt="Card Heart"
          onClick={(e) => {
            e.stopPropagation();
            e.target.classList.toggle("card__heart-liked");
          }}
        />
      </div>
    </li>
  );
}

export default ItemCard;
