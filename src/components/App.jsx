import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import { apiKey, coords } from "../utils/constants";
import weatherAPI from "../utils/weatherApi.js";
import { defaultClothingItems } from "../utils/constants";
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
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");
  const [location, setLocation] = useState("New York");
  const [card, setCurrentCard] = useState({ name: "", link: "" });

  function onClose() {
    setActiveModal("");
  }

  function onOpen(activeModal) {
    setActiveModal(activeModal);
  }

  useEffect(() => {
    api.getWeatherData().then((data) => {
      setTemperature(data.temperature);
      setLocation(data.location);
      setWeather(data.weather);
    });
  }, []);

  return (
    <div className="app">
      <Header location={location} onOpen={onOpen} />
      <Main
        images={defaultClothingItems}
        temperature={temperature}
        setCurrentCard={setCurrentCard}
        onOpen={onOpen}
      />
      <Footer />
      <ModalWithForm
        title="New garment"
        name="new-garment"
        buttonText="Add Garment"
        activeModal={activeModal}
        onClose={onClose}
      >
        <fieldset className="form__fieldset">
          <label className="form__field">
            Name
            <input
              className="form__input"
              name="name"
              type="text"
              placeholder="Name"
              required
            />
          </label>
          <label className="form__field">
            Image
            <input
              className="form__input"
              name="imageURL"
              type="url"
              placeholder="Image URL"
              required
            />
          </label>
        </fieldset>
        <fieldset className="form__fieldset form__fieldset-checkbox">
          <h3 className="form__heading">Select the weather type:</h3>
          <div className="form__field-checkbox">
            <input
              type="radio"
              name="weather"
              className="form__input-checkbox"
            />
            <label className="form__label-checkbox">Hot</label>
          </div>
          <div className="form__field-checkbox">
            <input
              type="radio"
              name="weather"
              className="form__input-checkbox"
            />
            <label className="form__label-checkbox">Warm</label>
          </div>
          <div className="form__field-checkbox">
            <input
              type="radio"
              name="weather"
              className="form__input-checkbox"
            />
            <label className="form__label-checkbox">Cold</label>
          </div>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        onClose={onClose}
        card={card}
        weather={weather}
        activeModal={activeModal}
        name="card-modal"
      />
    </div>
  );
}

export default App;
