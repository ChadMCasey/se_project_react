import { chooseTimeofDay, weatherImages } from "../scripts/utils/constants.js";
import "../blocks/WeatherCard.css";

function WeatherCard({ temperature, weatherStatus, timeOfDay }) {
  const image = weatherImages.find((obj) => {
    return obj.name === `${timeOfDay}-${weatherStatus}`;
  });

  console.log(timeOfDay);
  return (
    <section className="weather-card">
      {image && (
        <img
          className="weather-card__image"
          src={image.image}
          alt={image.name}
        />
      )}
      <h2 className="weather-card__temperature">{temperature}° F</h2>
    </section>
  );
}

export default WeatherCard;
