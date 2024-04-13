import {
  chooseStatus,
  chooseWeather,
  chooseTimeofDay,
  apiKey,
} from "./constants";

export default class WeatherAPI {
  constructor({ apiKey, headers }) {
    this._apiKey = apiKey;
    this._headers = headers;
  }

  buildGeocodingUrl(city) {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${this._apiKey}`;
  }

  buildWeatherDataUrl(lat, long) {
    return `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${long}&appid=${this._apiKey}`;
  }

  getGeocodingData(url) {
    return this._request(url, {});
  }

  getWeatherData(url) {
    return this._request(url, {}).then(this._cleanData);
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
