import React, { useEffect } from "react";
import "../blocks/Form.css";
import ModalWithForm from "./ModalWithForm";
import "../blocks/RegisterModal.css";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const RegisterModal = (props) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  function onRegisterSubmit(e) {
    e.preventDefault();
    props.onRegister(values, resetForm);
  }

  function handleSignInClick() {
    props.onClose();
    props.onOpen("login-modal");
  }

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <ModalWithForm
      {...props}
      title="Register"
      name="register-modal"
      submitHandle={onRegisterSubmit}
      isOpen={props.activeModal === "register-modal"}
    >
      <fieldset className="form__fieldset">
        <label
          className={`form__field ${errors.email && "form__field_invalid"}`}
        >
          Email
          <input
            type="text"
            className="form__input"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
            pattern=".+@.+\..+"
            placeholder="Email"
            required
          />
          <p className="form__input-error">
            {errors.email && "Please enter a valid email address"}
          </p>
        </label>
        <label
          className={`form__field ${errors.password && "form__field_invalid"}`}
        >
          Password
          <input
            type="password"
            className="form__input"
            name="password"
            value={values.password || ""}
            minLength={8}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <p className="form__input-error">{errors.password}</p>
        </label>
        <label
          className={`form__field ${errors.name && "form__field_invalid"}`}
        >
          Name
          <input
            type="text"
            className="form__input"
            name="name"
            value={values.name || ""}
            minLength={2}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <p className="form__input-error">{errors.name}</p>
        </label>
        <label
          className={`form__field ${errors.AvatarURL && "form__field_invalid"}`}
        >
          Avatar URL
          <input
            type="url"
            className="form__input"
            name="avatar"
            value={values.avatar || ""}
            onChange={handleChange}
            placeholder="Avatar URL"
            required
          />
          <p className="form__input-error">{errors.avatar}</p>
        </label>
      </fieldset>
      <div className="modal__submit-container">
        <button className="modal__submit form__submit" disabled={!isValid}>
          {props.isLoading ? "Signing Up..." : "Sign Up"}
        </button>
        <button
          className="modal__secondary-option"
          type="button"
          onClick={handleSignInClick}
        >
          Sign In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
