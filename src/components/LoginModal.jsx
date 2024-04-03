import React, { useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import "../blocks/LoginModal.css";
import "../blocks/Form.css";
import "../blocks/Modal.css";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const LoginModal = (props) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  function handleLoginSubmit(e) {
    e.preventDefault();
    props.onLogin(values, resetForm);
  }

  function handleRegisterClick() {
    props.onClose();
    props.onOpen("register-modal");
  }

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <ModalWithForm
      {...props}
      title="Log In"
      name="login-modal"
      submitHandle={handleLoginSubmit}
      isOpen={props.activeModal === "login-modal"}
    >
      <fieldset className="form__fieldset">
        <label
          className={`form__field ${errors.email && "form__field_invalid"}`}
        >
          {errors.email ? "Incorrect Email" : "Email"}
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={values.email || ""}
            pattern=".+@.+\..+"
            onChange={handleChange}
            className="form__input"
            required
          />
          <p className="form__input-error">
            {errors.email && "Please enter valid email address"}
          </p>
        </label>
        <label
          className={`form__field ${errors.password && "form__field_invalid"}`}
        >
          {errors.password ? "Incorrect Password" : "Password"}
          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength={8}
            value={values.password || ""}
            onChange={handleChange}
            className="form__input"
            required
          />
          <p className="form__input-error">{errors.password}</p>
        </label>
      </fieldset>
      <div className="modal__submit-container">
        <button className="modal__submit form__submit" disabled={!isValid}>
          {props.isLoading ? "Signing In..." : "Log In"}
        </button>
        <button
          className="modal__secondary-option modal__signup"
          type="button"
          onClick={handleRegisterClick}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
