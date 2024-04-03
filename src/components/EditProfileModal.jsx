import React, { useEffect } from "react";
import ModalWithForm from "../components/ModalWithForm.jsx";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";
import "../blocks/EditProfileModal.css";

const EditProfileModal = ({
  activeModal,
  onClose,
  onOpen,
  isLoading,
  onEditProfile,
}) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  function editProfileSubmitHandle(e) {
    e.preventDefault();

    onEditProfile(values, resetForm);
  }

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile-modal"
      submitHandle={editProfileSubmitHandle}
      isOpen={activeModal === "edit-profile-modal"}
      onClose={onClose}
    >
      <fieldset className="form__fieldset">
        <label
          className={`form__field && ${errors.name && "form__field_invalid"}`}
        >
          Name
          <input
            name="name"
            type="text"
            className="form__input"
            placeholder="Name"
            minLength={2}
            value={values.name || ""}
            onChange={handleChange}
          />
          <span className="form__input-error">{errors.name}</span>
        </label>
        <label className="form__field">
          Avatar
          <input
            name="avatar"
            type="url"
            className="form__input"
            placeholder="Avatar URL"
            value={values.avatar || ""}
            onChange={handleChange}
          />
          <span className="form__input-error">{errors.avatar}</span>
        </label>
      </fieldset>
      <button className="modal__submit form__submit" disabled={!isValid}>
        {isLoading ? "Saving..." : "Save changes"}
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;
