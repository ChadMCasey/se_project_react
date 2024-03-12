const apiKey = "3e77788001945bd3a67d3b7355cd882a";
const coords = {
  latitude: 25.761681,
  longitude: -80.191788,
};

const formValidationConfig = {
  formSelector: ".modal__form",
  formFieldset: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inputErrorClass: "form__input_type_error",
  errorTextClass: "form__input-error_active",
};

const weatherImages = [
  {
    name: "Day-Sunny",
    image: new URL("../../assets/DayWeather/Day-Sunny.png", import.meta.url)
      .href,
  },
  {
    name: "Day-Cloudy",
    image: new URL("../assets/DayWeather/Day-Cloudy.png", import.meta.url).href,
  },
  {
    name: "Day-Fog",
    image: new URL("../assets/DayWeather/Day-Fog.png", import.meta.url).href,
  },
  {
    name: "Day-Snow",
    image: new URL("../assets/DayWeather/Day-Snow.png", import.meta.url).href,
  },
  {
    name: "Day-Storm",
    image: new URL("../assets/DayWeather/Day-Storm.png", import.meta.url).href,
  },
  {
    name: "Day-Rain",
    image: new URL("../assets/DayWeather/Day-Rain.png", import.meta.url).href,
  },

  {
    name: "Night-Storm",
    image: new URL("../assets/NightWeather/Night-Storm.png", import.meta.url)
      .href,
  },
  {
    name: "Night-Sunny",
    image: new URL("../assets/NightWeather/Night-Sunny.png", import.meta.url)
      .href,
  },
  {
    name: "Night-Fog",
    image: new URL("../assets/NightWeather/Night-Fog.png", import.meta.url)
      .href,
  },
  {
    name: "Night-Storm",
    image: new URL("../assets/NightWeather/Night-Storm.png", import.meta.url)
      .href,
  },
  {
    name: "Night-Snow",
    image: new URL("../assets/NightWeather/Night-Snow.png", import.meta.url)
      .href,
  },
  {
    name: "Night-Cloudy",
    image: new URL("../assets/NightWeather/Night-Cloudy.png", import.meta.url)
      .href,
  },
  {
    name: "Night-Rain",
    image: new URL("../assets/NightWeather/Night-Rain.png", import.meta.url)
      .href,
  },
];

const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

function chooseWeather(temp) {
  return temp >= 86 ? "hot" : temp >= 66 ? "warm" : "cold";
}

function chooseStatus(id) {
  let status;
  if (id >= 200 && id < 300) {
    status = "Storm";
  } else if (id >= 300 && id < 600) {
    status = "Rain";
  } else if (id >= 600 && id < 700) {
    status = "Snow";
  } else if (id === 741) {
    status = "Fog";
  } else if ([801, 802, 803, 804].includes(id)) {
    status = "Cloudy";
  } else if (id === 800) {
    status = "Sunny";
  }
  return status;
}

function chooseTimeofDay(sunrise, sunset) {
  const currTime = new Date().getTime() / 1000;
  return currTime < sunrise || currTime >= sunset ? "Night" : "Day";
}

export {
  weatherImages,
  defaultClothingItems,
  apiKey,
  coords,
  formValidationConfig,
  chooseWeather,
  chooseStatus,
  chooseTimeofDay,
};
