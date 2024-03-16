import { useEffect } from "react";
import "../blocks/CardModal.css";

function ItemModal({
  onClose,
  card,
  activeModal,
  name,
  weather,
  deleteHandler,
}) {
  return (
    <div
      className={`modal ${
        activeModal === "card-modal" && "modal_opened"
      } modal_type_${name}`}
      onClick={(e) => {
        e.target === e.currentTarget && onClose();
      }}
    >
      <div className="modal__container card-modal__container">
        <button className="modal__close" type="button" onClick={onClose} />
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__text-section">
          <div className="modal__text-headings">
            <h3 className="modal__heading">{card.name}</h3>
            <h3 className="modal__heading">Weather: {weather}</h3>
          </div>
          <button className="modal__delete" type="button">
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
