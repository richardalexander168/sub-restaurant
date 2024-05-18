/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/templates';

const RestaurantItem = {
  async render() {
    return `
        <section class="section_main">
        <div>
          <h2>Welcome to Wareg Tenan's Website</h2>
          <p>Silahkan eksplorasi restoran favourite Anda</p>
        </div>
        </section>
        <div class="section_sort">
          <label for="">Sort by:</label>
          <button id="sort_name">Name</button>
          <button id="sort_rating">Rating</button>
        </div>
        <section id="section_container" class="section_container">

        </section>
        `;
  },

  async afterRender() {
    const sectionContainer = document.getElementById('section_container');

    try {
      sectionContainer.innerHTML = '<div class="loading-spinner"></div>';

      const restaurants = await RestaurantDbSource.showingRestaurantItem();
      this.renderRestaurants(sectionContainer, restaurants);

      document.getElementById('sort_name').addEventListener('click', () => {
        this.sortByName(sectionContainer);
      });

      document.getElementById('sort_rating').addEventListener('click', () => {
        this.sortByRating(sectionContainer);
      });
    } catch (error) {
      console.error('Failed to fetch restaurant items:', error);
      window.alert('Data tidak dapat dimuat');
      sectionContainer.innerHTML = '<p>Failed to fetch restaurant items. Please try again later.</p>';
    }
  },

  async sortByName(sectionContainer) {
    try {
      const restaurants = await RestaurantDbSource.showingRestaurantItem();
      const sortedRestaurants = restaurants.sort((a, b) => a.name.localeCompare(b.name));
      this.renderRestaurants(sectionContainer, sortedRestaurants);
    } catch (error) {
      console.error('Failed to fetch restaurant items:', error);
      window.alert('Data tidak dapat dimuat');
      sectionContainer.innerHTML = '<p>Failed to fetch restaurant items. Please try again later.</p>';
    }
  },

  async sortByRating(sectionContainer) {
    try {
      const restaurants = await RestaurantDbSource.showingRestaurantItem();
      const sortedRestaurants = restaurants.sort((a, b) => b.rating - a.rating);
      this.renderRestaurants(sectionContainer, sortedRestaurants);
    } catch (error) {
      console.error('Failed to fetch restaurant items:', error);
      window.alert('Data tidak dapat dimuat');
      sectionContainer.innerHTML = '<p>Failed to fetch restaurant items. Please try again later.</p>';
    }
  },

  renderRestaurants(container, restaurants) {
    container.innerHTML = '';
    restaurants.forEach((restaurant) => {
      container.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default RestaurantItem;
