import "../blocks/ItemCard.css";

function ItemCard({ image, setCurrentCard, onOpen }) {
  return (
    <li
      className="card"
      onClick={() => {
        setCurrentCard({ name: image.name, link: image.link });
        onOpen("card-modal");
      }}
    >
      <img className="card__image" src={image.link} alt={image.name} />
      <h3 className="card__title">{image.name}</h3>
    </li>
  );
}

export default ItemCard;
