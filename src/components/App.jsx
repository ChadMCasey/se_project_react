import "../blocks/App.css";
import API from "../utils/api.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import Profile from "./Profile.jsx";
import WeatherAPI from "../utils/weatherApi.js";
import ToggleSwitch from "./ToggleSwitch.jsx";
import AddItemModal from "./AddItemModal.jsx";
import DeleteConfirmationModal from "./DeleteConfirmationModal.jsx";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";
import { useState, useEffect } from "react";
import { apiKey, coords } from "../utils/constants.js";
import { Routes, Route } from "react-router-dom";
import { formValidationConfig } from "../utils/constants.js";

const WeatherApi = new WeatherAPI({
  apiKey: apiKey,
  coords,
  headers: {
    "Content-Type": "application/json",
  },
});

const cardsApi = new API(); // card

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [temperature, setTemperature] = useState({});
  const [weather, setWeather] = useState("");
  const [weatherStatus, setWeatherStatus] = useState("");
  const [location, setLocation] = useState("");
  const [modalCard, setCurrentCard] = useState({
    name: "",
    imageUrl: "",
    weather: "",
    _id: "",
  });
  const [timeOfDay, setTimeOfDay] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothing, setClothing] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function onClose() {
    setActiveModal("");
  }

  function onOpen(activeModal) {
    setActiveModal(activeModal);
  }

  function handleAddItemSubmit(clothingItem, resetFormCallaback) {
    setIsLoading(true);
    cardsApi
      .postClothingItem(clothingItem)
      .then((res) => {
        setClothing([res, ...clothing]);
        onClose();
        resetFormCallaback(); // reset and close on successful submission only
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete() {
    setIsLoading(true);
    cardsApi
      .deleteClothingItem(modalCard._id)
      .then((res) => {
        setClothing((clothing) => {
          return clothing.filter((article) => {
            return article._id != modalCard._id;
          });
        });
      })
      .then(() => {
        setCurrentCard({ name: "", imageUrl: "", weather: "" });
        onClose();
      })
      .catch((error) => {
        console.log(`Error Status Code: ${error.status}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    cardsApi
      .getClothingItems()
      .then((data) => {
        setClothing([...data]);
      })
      .catch((error) => {
        console.log(`Error Status Code: ${error.status}`);
      });
  }, []);

  useEffect(() => {
    if (activeModal === "") return;
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
                clothing={clothing}
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
                clothing={clothing}
                onOpen={onOpen}
                setCurrentCard={setCurrentCard}
                setActiveModal={setActiveModal}
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
        isLoading={isLoading}
        activeModal={activeModal}
        onAddItem={handleAddItemSubmit}
      />

      <ItemModal
        onClose={onClose}
        card={modalCard}
        weather={weather}
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        name="card-modal"
      />

      <DeleteConfirmationModal
        onClose={onClose}
        isLoading={isLoading}
        activeModal={activeModal}
        deleteCardCallback={handleCardDelete}
      />
    </div>
  );
}

export default App;
