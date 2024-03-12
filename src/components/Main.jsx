import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/ItemCards.css";
import "../blocks/Main.css";

function Main({
  temperature,
  images,
  setCurrentCard,
  onOpen,
  weather,
  weatherStatus,
  timeOfDay,
}) {
  return (
    <main className="main">
      <WeatherCard
        temperature={temperature}
        weatherStatus={weatherStatus}
        timeOfDay={timeOfDay}
      />
      <h2 className="cards-title">
        Today is {temperature}° F / You may want to wear:
      </h2>
      <section className="card-items">
        <ul className="card-items__list">
          {images
            // .filter((image) => image.weather == weather)
            .map((image) => (
              <ItemCard
                image={image}
                key={image._id}
                setCurrentCard={setCurrentCard}
                onOpen={onOpen}
              />
            ))}
        </ul>
        <button className="card-items__randomize" type="button">
          <span className="cards-items__randomize-refresh"> &#8635;</span>
          Randomize
        </button>
      </section>
    </main>
  );
}

export default Main;
