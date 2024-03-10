import { useEffect } from "react";
import "../blocks/ModalWithForm.css";
import "../blocks/Form.css";
import { unmountComponentAtNode } from "react-dom";

function ModalWithForm({
  name,
  buttonText,
  title,
  activeModal,
  onClose,
  children,
}) {
  useEffect(() => {
    if (activeModal !== "add-modal") return;
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
        activeModal === "add-modal" && "modal_opened"
      } modal_type_${name}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal__container">
        <form className="form" name={name} noValidate>
          <h3 className="form__header">{title}</h3>
          {children}
          <button
            className="modal__close"
            type="button"
            onClick={onClose}
          ></button>
          <button className="modal__submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
