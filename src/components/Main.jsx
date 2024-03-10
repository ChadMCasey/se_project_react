import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";

function Main({ temperature, images, setCurrentCard, onOpen }) {
  return (
    <main>
      <WeatherCard temperature={temperature} />
      <h2 className="card-items__heading">
        Today is {temperature} / You may want to wear:
      </h2>
      <section className="card-items">
        <ul className="card-items__list">
          {images.map((image) => (
            <ItemCard
              image={image}
              key={image._id}
              setCurrentCard={setCurrentCard}
              onOpen={onOpen}
            />
          ))}
          ;
        </ul>
      </section>
    </main>
  );
}

export default Main;
