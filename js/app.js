// IMPORTS START -->
import { JSON_PATH } from "./constants.js";
import * as dr from "./dragEvents.js";
import { shuffle } from "./helpers.js";
// <-- IMPORTS END

// APP FUNCTIONALITY
const app = {
  init() {
    this.animalData = [];
    this.cacheElements();
    this.registerListeners();
    this.fetchData();
  },
  cacheElements() {
    this.$animalContainer = document.querySelector("#animals");
    this.$dropzone = document.querySelector("#dropzone");
  },
  registerListeners() {},
  async fetchData() {
    const response = await fetch(JSON_PATH);
    this.animalData = await response.json();

    this.createIcons();
    this.createDropzone();
  },
  createIcons() {
    // lege animal array maken voor alle iconen
    let iconElements = [];
    // itereren door elk animal object
    for (const type of this.animalData.animals) {
      const icons = type.icons.map(
        (icon) => `<img src="./icons/${icon}.png" alt="${icon}">`
      );
      iconElements.push(...icons);
    }
    // door elkaar schudden
    shuffle(iconElements);
    iconElements = iconElements.slice(0, 6);
    this.$animalContainer.innerHTML = iconElements.join("");
  },
  createDropzone() {
    let types = this.animalData.animals.map((typeObj) => typeObj.type);

    const dropContainers = types.map((type) => {
      return `<div><h2>${type}</h2></div>`;
    });

    this.$dropzone.innerHTML = dropContainers.join("");
  },
};

// BEAM ME UP SCOTTY
app.init();
