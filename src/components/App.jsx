import "../blocks/App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import Profile from "./Profile.jsx";
import weatherAPI from "../utils/weatherApi.js";
import ToggleSwitch from "./ToggleSwitch.jsx";
import AddItemModal from "./AddItemModal.jsx";
import { CurrentTemperatureUnitContext } from "../contexts/currentTemperatureUnit.js";
import { useState, useEffect } from "react";
import { apiKey, coords, defaultClothingItems } from "../utils/constants.js";
import { Routes, Route } from "react-router-dom";
import API from "../utils/api.js";

const WeatherApi = new weatherAPI({
  apiKey: apiKey,
  coords,
  headers: {
    "Content-Type": "application/json",
  },
});

const userDataApi = new API();

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [temperature, setTemperature] = useState({}); // 75 deg
  const [weather, setWeather] = useState(""); // hot warm cold
  const [weatherStatus, setWeatherStatus] = useState(""); // cloudy snow rain
  const [location, setLocation] = useState(""); // Miami
  const [modalCard, setCurrentCard] = useState({ name: "", link: "" }); // Card info for modal
  const [timeOfDay, setTimeOfDay] = useState(""); // day or night (needed for weather card image)
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  function onClose() {
    setActiveModal("");
  }

  function onOpen(activeModal) {
    setActiveModal(activeModal);
  }

  function handleAddItemSubmit(clothingItem) {
    onClose();
    userDataApi.setClothingItems([...defaultClothingItems, clothingItem]);
  }

  function handleItemDelete(card) {
    // delete card
    onClose();
  }

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit(currentTemperatureUnit == "F" ? "C" : "F");
  }

  useEffect(() => {
    WeatherApi.getWeatherData()
      .then((data) => {
        setTemperature(data.temperature);
        setLocation(data.location);
        setWeather(data.weather.weatherFeeling);
        setWeatherStatus(data.weather.status);
        setTimeOfDay(data.timeofday);
      })
      .catch((error) => {
        console.log(`Error Status Code: ${error.status}`);
      });
  }, []);

  useEffect(() => {
    function escapeClose(e) {
      e.key === "Escape" && onClose();
    }
    window.addEventListener("keydown", escapeClose);
    return () => {
      window.removeEventListener("keydown", escapeClose);
    };
  }, [activeModal]);

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          location={location}
          onOpen={onOpen}
          onClose={onClose}
          mobileModal="hamburger-modal"
          activeModal={activeModal}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                onOpen={onOpen}
                setCurrentCard={setCurrentCard}
                images={defaultClothingItems}
                temperature={temperature}
                weather={weather}
                weatherStatus={weatherStatus}
                timeOfDay={timeOfDay}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                images={defaultClothingItems}
                onOpen={onOpen}
                setCurrentCard={setCurrentCard}
              />
            }
          ></Route>
        </Routes>
      </CurrentTemperatureUnitContext.Provider>

      <Footer />
      <AddItemModal
        title="New garment"
        name="new-garment"
        buttonText="Add Garment"
        onClose={onClose}
        activeModal={activeModal}
        onAddItem={handleAddItemSubmit}
      />

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
