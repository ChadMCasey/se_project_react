import React, { useEffect, createRef, useContext } from "react";
import ModalWithForm from "../components/ModalWithForm.jsx";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";
import "../blocks/EditProfileModal.css";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

const EditProfileModal = ({
  activeModal,
  onClose,
  onOpen,
  isLoading,
  onEditProfile,
}) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  const { userData } = useContext(CurrentUserContext);

  const nameInput = createRef();
  const avatarInput = createRef();

  function editProfileSubmitHandle(e) {
    e.preventDefault();
    onEditProfile(values, resetForm);
  }

  useEffect(() => {
    resetForm();
  }, []);

  useEffect(() => {
    if (activeModal === "edit-profile-modal") {
      const { name, avatar } = userData;
      nameInput.current.value = name;
      avatarInput.current.value = avatar;
    }
  }, [activeModal]);

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
            ref={nameInput}
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
            ref={avatarInput}
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
