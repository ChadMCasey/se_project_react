import { weatherImages } from "../utils/constants";
import "../blocks/WeatherCard.css";

function WeatherCard(props) {
  return (
    <section className="weather-card">
      <img
        className="weather-card__image"
        src={weatherImages[0].image}
        alt={weatherImages[0].image}
      />
      <h2 className="weather-card__temperature">{props.temperature}° F</h2>
    </section>
  );
}

export default WeatherCard;
