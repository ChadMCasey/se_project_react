import React, { useEffect } from "react";
import "../blocks/Form.css";
import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";

const EditLocationModal = ({
  name,
  title,
  onClose,
  activeModal,
  editProfileSubmitCallback,
  location,
}) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  const isOpen = activeModal === "edit-location-modal";

  function handleEditLocationSubmit(e) {
    e.preventDefault();
    editProfileSubmitCallback(values, resetForm);
  }

  useEffect(() => {
    if (isOpen) {
      setValues((values) => {
        return { ...values, location: location };
      });
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      name={name}
      title={title}
      onClose={onClose}
      isOpen={isOpen}
      submitHandle={handleEditLocationSubmit}
    >
      <fieldset className="form__fieldset">
        <label
          className={`form__field ${errors.location && "form__field_invalid"}`}
        >
          City Location (USA)
          <input
            type="text"
            name="location"
            minLength={2}
            maxLength={30}
            placeholder="Add Location"
            className="form__input"
            value={values.location || ""}
            onChange={handleChange}
          />
          <p className="form__input-error">
            {errors.location && `${errors.location}`}
          </p>
        </label>
      </fieldset>
      <button className="form__submit modal__submit">Save</button>
    </ModalWithForm>
  );
};

export default EditLocationModal;
