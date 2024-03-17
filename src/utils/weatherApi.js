import { chooseStatus, chooseWeather, chooseTimeofDay } from "./constants";

export default class WeatherAPI {
  constructor({ apiKey, coords, headers }) {
    this._apiKey = apiKey;
    this._headers = headers;
    this._coords = coords;
    this._url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}`;
  }

  getWeatherData() {
    return this._request(this._url, {}).then(this._cleanData);
  }

  _validateResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  _request(url, options) {
    return fetch(url, options).then(this._validateResult);
  }

  _cleanData(res) {
    return {
      location: res.name,
      temperature: {
        F: Math.round(res.main.temp),
        C: Math.round(((res.main.temp - 32) * 5) / 9),
      },
      weather: {
        weatherFeeling: chooseWeather(res.main.temp),
        status: chooseStatus(res.weather[0].id),
      },
      timeofday: chooseTimeofDay(res.sys.sunrise, res.sys.sunset),
    };
  }
}
