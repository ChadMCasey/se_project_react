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
    props.onAddItem(values, resetForm);
  }

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <ModalWithForm
      {...props}
      submitHandle={handleAddSubmit}
      isOpen={isOpen}
      isValid={isValid}
      isLoading={props.isLoading}
    >
      <fieldset className="form__fieldset">
        <label className="form__field">
          Name
          <input
            onChange={handleChange}
            value={values.name || ""}
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
            value={values.imageUrl || ""}
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
            checked={values.weather === "hot"}
            type="radio"
            name="weather"
            id="hot"
            value="hot"
            className="form__input form__input-radio"
            required
          />
          <label className="form__label-radio" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="form__field-radio">
          <input
            onChange={handleChange}
            checked={values.weather === "warm"}
            type="radio"
            name="weather"
            value="warm"
            id="warm"
            className="form__input form__input-radio"
            required
          />
          <label className="form__label-radio" htmlFor="warm">
            Warm
          </label>
        </div>
        <div className="form__field-radio">
          <input
            onChange={handleChange}
            checked={values.weather === "cold"}
            type="radio"
            name="weather"
            value="cold"
            id="cold"
            className="form__input form__input-radio"
            required
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
