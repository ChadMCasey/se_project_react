import { userDataApiConfig } from "./constants";

export default class API {
  constructor() {
    this._baseUrl = userDataApiConfig.baseUrl;
    this._headers = userDataApiConfig.headers;
  }

  deleteClothingItem(id) {
    return this._request(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  postClothingItem(obj) {
    return this._request(`${this._baseUrl}/items`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: obj.name,
        imageUrl: obj.imageUrl,
        weather: obj.weather,
      }),
    });
  }

  getClothingItems() {
    return this._request(`${this._baseUrl}/items`, {
      method: "GET",
      headers: this._headers,
    });
  }

  _request(url, options) {
    return fetch(url, options).then(this._validateResults);
  }

  _validateResults(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }
}
