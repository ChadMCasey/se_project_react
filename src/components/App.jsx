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
import LoginModal from "./LoginModal.jsx";
import DeleteConfirmationModal from "./DeleteConfirmationModal.jsx";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";
import { useState, useEffect } from "react";
import { apiKey, coords, defaultWeatherURL } from "../utils/constants.js";
import { Routes, Route } from "react-router-dom";
import { formValidationConfig } from "../utils/constants.js";
import RegisterModal from "./RegisterModal.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import * as auth from "../utils/auth.js";
import { setToken, getToken, removeToken } from "../utils/token.js";
import EditProfileModal from "../components/EditProfileModal.jsx";
import { shuffle } from "../utils/shuffle.js";
import EditLocationModal from "./EditLocationModal";
import BadRequest from "../utils/errors/BadRequest";

const WeatherApi = new WeatherAPI({
  apiKey: apiKey,
  coords,
  headers: {
    "Content-Type": "application/json",
  },
});

const api = new API(); // card

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    avatar: "",
    name: "",
    _id: "",
  });

  const [activeModal, setActiveModal] = useState("");

  const [temperature, setTemperature] = useState({});
  const [weather, setWeather] = useState("");
  const [weatherStatus, setWeatherStatus] = useState("");
  const [location, setLocation] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [clothing, setClothing] = useState({});
  const [modalCard, setCurrentCard] = useState({
    name: "",
    imageUrl: "",
    weather: "",
    _id: "",
  });

  function randomizeClothing(e) {
    setClothing((clothing) => {
      return [...shuffle(clothing)];
    });
  }

  function setWeatherAndLocation(data) {
    setTemperature(data.temperature);
    setLocation(data.location);
    setWeather(data.weather.weatherFeeling);
    setWeatherStatus(data.weather.status);
    setTimeOfDay(data.timeofday);
  }

  function onClose() {
    setActiveModal("");
  }

  function onOpen(activeModal) {
    setActiveModal(activeModal);
  }

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit(currentTemperatureUnit == "F" ? "C" : "F");
  }

  function handleAddItemSubmit(clothingItem, resetFormCallaback) {
    setIsLoading(true);
    api
      .postClothingItem(clothingItem, getToken())
      .then((res) => {
        setClothing([res, ...clothing]);
        onClose();
        resetFormCallaback();
      })
      .catch((err) => {
        console.error(`Clothing Post Error: ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteClothingItem(modalCard._id, getToken())
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
        console.error(`Card Delete Error Status: ${error.status}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike({ id, isLiked }) {
    !isLiked
      ? api
          .likeClothingItem(id, getToken())
          .then((updatedCard) => {
            setClothing((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.error(`Card Like Error: ${err.message}`))
      : api
          .unlikeClothingItem(id, getToken())
          .then((updatedCard) => {
            setClothing((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.error(`Card Unlike Error: ${err.message}`));
  }

  function handleRegisterSubmit(values, resetFormCallback) {
    setIsLoading(true);
    auth
      .signup(values)
      .then(() => {
        const { email, password } = values;
        handleSignInSubmit({ email, password }); // log the user in
        onClose(); // close modal
      })
      .catch((err) => {
        console.error(`Registration Error: ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignInSubmit(values, resetFormCallback) {
    auth
      .signin(values.email, values.password)
      .then((res) => {
        const { name, email, token, avatar, _id } = res;
        onClose();
        resetFormCallback && resetFormCallback();
        setToken(token);
        setIsLoggedIn(true);
        setUserData({
          name,
          email,
          avatar,
          _id,
        });
      })
      .catch((err) => {
        console.error(`Login Error: ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogout() {
    removeToken();
    setIsLoggedIn(false);
    setUserData({
      email: "",
      avatar: "",
      _id: "",
      name: "",
    });
  }

  function handleEditProfileSubmit(values, resetFormCallback) {
    const name = values.name || userData.name; // if user doesnt update this value use old value
    const avatar = values.avatar || userData.avatar;
    setIsLoading(true);
    api
      .updateUserData({
        name,
        avatar,
        token: getToken(),
      })
      .then((user) => {
        const { name, email } = user;
        onClose();
        resetFormCallback();
        setUserData((prevData) => {
          return { ...userData, name, avatar };
        });
      })
      .catch((err) => {
        console.error(`Profile Update Error: ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditLocationSubmit(values) {
    const url = WeatherApi.buildGeocodingUrl(values.location);
    return WeatherApi.getGeocodingData(url)
      .then((res) => {
        if (res.length === 0) {
          throw new BadRequest("The specified city could not be identified.");
        }
        return WeatherApi.buildWeatherDataUrl(res[0].lat, res[0].lon);
      })
      .then((url) => {
        return WeatherApi.getWeatherData(url).then((data) => {
          setWeatherAndLocation(data);
          onClose();
        });
      })
      .catch((err) => {
        console.log(JSON.stringify(err.message));
        console.error(`${err.status}: ${err.message}`);
      });
  }

  useEffect(() => {
    WeatherApi.getWeatherData(defaultWeatherURL)
      .then((data) => {
        setWeatherAndLocation(data);
      })
      .catch((error) => {
        console.error(`Weather Query Error: ${error.status}`);
      });
  }, []);

  useEffect(() => {
    api
      .getClothingItems()
      .then((data) => {
        setClothing([...data]);
      })
      .catch((error) => {
        console.error(`Error Status Code: ${error.status}`);
      });
  }, []);

  useEffect(() => {
    const jwt = getToken();
    if (jwt) {
      api
        .getUserData(jwt)
        .then((res) => {
          const { _id, name, email, avatar } = res;
          setIsLoggedIn(true);

          setUserData({
            name,
            avatar,
            email,
            _id,
          });
        })
        .catch((err) => {
          console.error(`Authentication Error: ${err.message}`);
        });
    }
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
        <CurrentUserContext.Provider value={{ isLoggedIn, userData }}>
          <Header
            location={location}
            onOpen={onOpen}
            onClose={onClose}
            mobileModal="hamburger-modal"
            activeModal={activeModal}
            handleLogout={handleLogout}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  onOpen={onOpen}
                  setCurrentCard={setCurrentCard}
                  randomizeClothing={randomizeClothing}
                  clothing={clothing}
                  temperature={temperature}
                  weather={weather}
                  weatherStatus={weatherStatus}
                  timeOfDay={timeOfDay}
                  handleCardLike={handleCardLike}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothing={clothing}
                    weather={weather}
                    onOpen={onOpen}
                    setCurrentCard={setCurrentCard}
                    setActiveModal={setActiveModal}
                    handleCardLike={handleCardLike}
                    handleLogout={handleLogout}
                  />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
          <Footer />
          <AddItemModal
            onClose={onClose}
            isLoading={isLoading}
            activeModal={activeModal}
            onAddItem={handleAddItemSubmit}
          />
          <LoginModal
            onOpen={onOpen}
            onClose={onClose}
            isLoading={isLoading}
            activeModal={activeModal}
            onLogin={handleSignInSubmit}
          />
          <RegisterModal
            onClose={onClose}
            onOpen={onOpen}
            isLoading={isLoading}
            activeModal={activeModal}
            onRegister={handleRegisterSubmit}
          />
          <EditProfileModal
            onClose={onClose}
            onOpen={onOpen}
            isLoading={isLoading}
            activeModal={activeModal}
            onEditProfile={handleEditProfileSubmit}
          />
          <EditLocationModal
            onClose={onClose}
            name="edit-location-modal"
            title="Edit City"
            activeModal={activeModal}
            editProfileSubmitCallback={handleEditLocationSubmit}
            location={location}
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
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
