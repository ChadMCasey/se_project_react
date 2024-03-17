import { useEffect } from "react";
import "../blocks/Modal.css";
import "../blocks/Form.css";
import "../blocks/NewGarmentModal.css";
import { unmountComponentAtNode } from "react-dom";
import "../hooks/useFormAndValidation.js";

function ModalWithForm({
  name,
  buttonText,
  title,
  onClose,
  isOpen,
  children,
  submitHandle,
  isLoading,
  isValid,
}) {
  return (
    <div
      className={`modal ${isOpen && "modal_opened"} modal_type_${name}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal__container">
        <form className="form" name={name} onSubmit={submitHandle}>
          <h3 className="form__header">{title}</h3>
          {children}
          <button
            className="modal__close form__close"
            type="button"
            onClick={onClose}
          />
          <button className="modal__submit form__submit" disabled={!isValid}>
            {isLoading ? "saving..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
