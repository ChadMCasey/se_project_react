import React, { useState } from "react";
import { useEffect } from "react";
import ModalWithForm from "./ModalWithForm";

const AddItemModal = (props) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [weather, setWeather] = useState("");

  const isOpen = props.activeModal === "add-modal"; // for use effect dependency below

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleImageUrlChange(e) {
    setLink(e.target.value);
  }

  function handleWeatherChange(e) {
    setWeather(e.target.value);
  }

  function handleAddSubmit(e) {
    e.preventDefault();
    props.onAddItem({
      name,
      link,
      weather,
      // create a dummy id for our clothing card
      _id: Math.floor(Math.random() * (100000000 - 0 + 1)) + 0,
    });
  }

  useEffect(() => {
    setName("");
    setWeather("");
    setLink("");
  }, [isOpen]);

  return (
    <ModalWithForm {...props} submitHandle={handleAddSubmit}>
      <fieldset className="form__fieldset">
        <label className="form__field">
          Name
          <input
            onChange={handleNameChange}
            value={name}
            className="form__input"
            id="name-input"
            name="name"
            type="text"
            placeholder="Name"
            minLength={2}
            required
          />
          <span className="form__input-error name-input-error"></span>
        </label>
        <label className="form__field">
          Image
          <input
            onChange={handleImageUrlChange}
            value={link}
            className="form__input"
            id="image-input"
            name="imageURL"
            type="url"
            placeholder="Image URL"
            required
          />
          <span className="form__input-error image-input-error"></span>
        </label>
      </fieldset>
      <fieldset className="form__fieldset form__fieldset-radio">
        <h3 className="form__heading">Select the weather type:</h3>
        <div className="form__field-radio">
          <input
            onChange={handleWeatherChange}
            type="radio"
            name="weather"
            value="hot"
            className="form__input form__input-radio"
            defaultChecked
          />
          <label className="form__label-radio">Hot</label>
        </div>
        <div className="form__field-radio">
          <input
            onChange={handleWeatherChange}
            type="radio"
            name="weather"
            value="warm"
            className="form__input form__input-radio"
          />
          <label className="form__label-radio">Warm</label>
        </div>
        <div className="form__field-radio">
          <input
            onChange={handleWeatherChange}
            type="radio"
            name="weather"
            value="cold"
            className="form__input form__input-radio"
          />
          <label className="form__label-radio">Cold</label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
