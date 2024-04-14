import { useEffect } from "react";
import "../blocks/Modal.css";
import "../blocks/Form.css";
import "../blocks/NewGarmentModal.css";
import { unmountComponentAtNode } from "react-dom";
import "../hooks/useFormAndValidation.js";

function ModalWithForm({
  name,
  title,
  onClose,
  isOpen,
  children,
  submitHandle,
}) {
  function ModalContainerClose(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`modal ${isOpen && "modal_opened"} modal_type_${name}`}
      onClick={(e) => ModalContainerClose(e)}
    >
      <div className="modal__container">
        <form className="form" name={name} onSubmit={submitHandle}>
          <h3 className="form__header">{title}</h3>
          {children}
        </form>

        <button
          className="modal__close form__close"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ModalWithForm;
