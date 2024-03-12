import { chooseStatus, chooseWeather, chooseTimeofDay } from "./constants";

export default class weatherAPI {
  constructor({ apiKey, coords, headers }) {
    this._apiKey = apiKey;
    this._headers = headers;
    this._coords = coords;
    this._url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}`;
  }

  getWeatherData() {
    return fetch(this._url).then(this._validateResult).then(this._cleanData);
  }

  _validateResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  _cleanData(res) {
    return {
      location: res.name,
      temperature: Math.round(res.main.temp),
      weather: {
        temp: chooseWeather(res.main.temp),
        status: chooseStatus(res.weather[0].id),
      },
      timeofday: chooseTimeofDay(res.sys.sunrise, res.sys.sunset),
    };
  }
}
