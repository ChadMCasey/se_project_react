import { useEffect } from "react";
import "../blocks/CardModal.css";

function ItemModal({ onClose, card, activeModal, name, weather }) {
  useEffect(() => {
    if (activeModal !== "card-modal") return;
    function escapeClose(e) {
      e.key === "Escape" && onClose();
    }
    window.addEventListener("keydown", escapeClose);
    return () => {
      window.removeEventListener("keydown", escapeClose);
    };
  }, [activeModal]);

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
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="modal__image" src={card.link} alt={card.name} />
        <h3 className="modal__heading">{card.name}</h3>
        <h3 className="modal__heading">Weather: {weather}</h3>
      </div>
    </div>
  );
}

export default ItemModal;
