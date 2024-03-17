import React, { useState } from "react";
import { useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const AddItemModal = (props) => {
  const isOpen = props.activeModal === "add-modal";
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  function handleAddSubmit(e) {
    e.preventDefault();
    resetForm();
    props.onAddItem(values);
  }
  return (
    <ModalWithForm
      {...props}
      submitHandle={handleAddSubmit}
      isOpen={isOpen}
      isValid={isValid}
    >
      <fieldset className="form__fieldset">
        <label className="form__field">
          Name
          <input
            onChange={handleChange}
            className="form__input"
            id="name-input"
            name="name"
            type="text"
            placeholder="Name"
            minLength={2}
            maxLength={20}
            required
          />
          <p className="form__input-error">{errors.name}</p>
        </label>
        <label className="form__field">
          Image
          <input
            onChange={handleChange}
            className="form__input"
            id="image-input"
            name="imageUrl"
            type="url"
            placeholder="Image URL"
            required
          />
          <p className="form__input-error">{errors.imageUrl}</p>
        </label>
      </fieldset>
      <fieldset className="form__fieldset form__fieldset-radio">
        <h3 className="form__heading">Select the weather type:</h3>
        <div className="form__field-radio">
          <input
            onChange={handleChange}
            type="radio"
            name="weather"
            id="hot"
            value="hot"
            className="form__input form__input-radio"
            defaultChecked
          />
          <label className="form__label-radio" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="form__field-radio">
          <input
            onChange={handleChange}
            type="radio"
            name="weather"
            value="warm"
            id="warm"
            className="form__input form__input-radio"
          />
          <label className="form__label-radio" htmlFor="warm">
            Warm
          </label>
        </div>
        <div className="form__field-radio">
          <input
            onChange={handleChange}
            type="radio"
            name="weather"
            value="cold"
            id="cold"
            className="form__input form__input-radio"
          />
          <label className="form__label-radio" htmlFor="cold">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
