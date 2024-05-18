import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class RestaurantDbSource {
  static async showingRestaurantItem() {
    const response = await fetch(API_ENDPOINT.RESTAURANT_ITEM);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async addingReview({ id, name, review }) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': `${CONFIG.KEY}`,
      },
      body: JSON.stringify({
        id,
        name,
        review,
      }),
    });
    const responseJson = await response.json();
    return responseJson;
  }
}

export default RestaurantDbSource;
