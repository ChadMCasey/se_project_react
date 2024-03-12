import { useEffect } from "react";
import "../blocks/ModalForm.css";
import "../blocks/Form.css";
import "../blocks/NewGarmentModal.css";
import { unmountComponentAtNode } from "react-dom";
import "../scripts/pages/index.js";

function ModalWithForm({
  name,
  buttonText,
  title,
  activeModal,
  onClose,
  children,
  submitCallback,
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

  function gatherFormData(e) {
    e.preventDefault();
    const formSubmissionData = {};
    Array.from(e.target.elements).forEach((element) => {
      if (element.tagName === "INPUT") {
        formSubmissionData[element.name] = element.value;
      }
    });
    submitCallback(formSubmissionData);
  }

  return (
    <div
      className={`modal ${
        activeModal === "add-modal" && "modal_opened"
      } modal_type_${name}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal__container">
        <form className="form" name={name} onSubmit={gatherFormData}>
          <h3 className="form__header">{title}</h3>
          {children}
          <button
            className="modal__close form__close"
            type="button"
            onClick={onClose}
          ></button>
          <button className="modal__submit form__submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
