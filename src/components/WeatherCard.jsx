import { weatherImages } from "../utils/constants.js";
import "../blocks/WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";
import { useContext } from "react";

function WeatherCard({ temperature, weatherStatus, timeOfDay }) {
  const currTempUnitContext = useContext(CurrentTemperatureUnitContext);
  const image = weatherImages.find((obj) => {
    return obj.name === `${timeOfDay}-${weatherStatus}`;
  });
  return (
    <section className="weather-card">
      {image && (
        <img
          className="weather-card__image"
          src={image.image}
          alt={image.name}
        />
      )}
      <h2 className="weather-card__temperature">
        {`${temperature[currTempUnitContext.currentTemperatureUnit]}° ${
          currTempUnitContext.currentTemperatureUnit
        }`}
      </h2>
    </section>
  );
}

export default WeatherCard;
