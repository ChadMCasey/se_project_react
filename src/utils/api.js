import { defaultClothingItems } from "./constants.js";

export default class API {
  constructor() {}

  setClothingItems(items) {
    // cant directly reassign defaultClothingItems
    items.forEach((item, i) => {
      defaultClothingItems[i] = item;
    });
  }
}
