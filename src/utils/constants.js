const apiKey = "3e77788001945bd3a67d3b7355cd882a";

const coords = {
  latitude: 25.761681,
  longitude: -80.191788,
};

const userDataApiConfig = {
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
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
  apiKey,
  coords,
  formValidationConfig,
  userDataApiConfig,
  chooseWeather,
  chooseStatus,
  chooseTimeofDay,
};
