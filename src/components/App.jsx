import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import { apiKey, coords, defaultClothingItems } from "../utils/constants.js";
import weatherAPI from "../utils/weatherApi.js";
import { useState, useEffect } from "react";

const api = new weatherAPI({
  apiKey: apiKey,
  coords,
  headers: {
    "Content-Type": "application/json",
  },
});

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [temperature, setTemperature] = useState(""); // 75 deg
  const [weather, setWeather] = useState(""); // hot warm cold
  const [weatherStatus, setWeatherStatus] = useState(""); // cloudy snow rain
  const [location, setLocation] = useState(""); // Miami
  const [modalCard, setCurrentCard] = useState({ name: "", link: "" }); // Card info for modal
  const [timeOfDay, setTimeOfDay] = useState(""); // day or night (needed for weather card image)

  function onClose() {
    setActiveModal("");
  }

  function onOpen(activeModal) {
    setActiveModal(activeModal);
  }

  function handleGarmentModalSubmit(data) {
    onClose();
    console.log(data);
  }

  useEffect(() => {
    api.getWeatherData().then((data) => {
      setTemperature(data.temperature);
      setLocation(data.location);
      setWeather(data.weather.temp);
      setWeatherStatus(data.weather.status);
      setTimeOfDay(data.timeofday);
    });
  }, []);

  return (
    <div className="app">
      <Header
        location={location}
        onOpen={onOpen}
        onClose={onClose}
        mobileModal="hamburger-modal"
        activeModal={activeModal}
      />
      <Main
        onOpen={onOpen}
        setCurrentCard={setCurrentCard}
        images={defaultClothingItems}
        temperature={temperature}
        weather={weather}
        weatherStatus={weatherStatus}
        timeOfDay={timeOfDay}
      />
      <Footer />
      <ModalWithForm
        title="New garment"
        name="new-garment"
        buttonText="Add Garment"
        onClose={onClose}
        activeModal={activeModal}
        submitCallback={handleGarmentModalSubmit}
      >
        <fieldset className="form__fieldset">
          <label className="form__field">
            Name
            <input
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
              type="radio"
              name="weather"
              value="warm"
              className="form__input form__input-radio"
            />
            <label className="form__label-radio">Warm</label>
          </div>
          <div className="form__field-radio">
            <input
              type="radio"
              name="weather"
              value="cold"
              className="form__input form__input-radio"
            />
            <label className="form__label-radio">Cold</label>
          </div>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        onClose={onClose}
        card={modalCard}
        weather={weather}
        activeModal={activeModal}
        name="card-modal"
      />
    </div>
  );
}

export default App;
