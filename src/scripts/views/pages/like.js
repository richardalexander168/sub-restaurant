import FavoriteRestaurantIdb from '../../data/favourite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/templates';

const Like = {
  async render() {
    return `
      <div id="section_container" class="section_container"></div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const sectionLikes = document.querySelector('#section_container');

    restaurants.forEach((restaurant) => {
      sectionLikes.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Like;
