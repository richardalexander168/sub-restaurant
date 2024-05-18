import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestaurantDetailTemplate } from '../templates/templates';
import InputReview from '../../utils/review-initiator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
        <div id="section_details" class="section_details"></div>
        
        <div id="likeButtonContainer" class="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const sectionDetail = document.getElementById('section_details');

    try {
      sectionDetail.innerHTML = '<div class="loading-spinner"></div>';

      const item = await RestaurantDbSource.detailRestaurant(url.id);
      const { restaurant } = item;

      sectionDetail.innerHTML = createRestaurantDetailTemplate(restaurant);

      InputReview.addingReview(url);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant,
      });
    } catch (error) {
      console.error('Failed to fetch restaurant detail:', error);
      sectionDetail.innerHTML = '<p>Failed to fetch restaurant detail. Please try again later.</p>';
    }
  },
};

export default Detail;
