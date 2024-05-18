import RestaurantDbSource from '../data/restaurantdb-source';
import { createReviewTemplate } from '../views/templates/templates';

const InputReview = {
  addingReview(url) {
    const submitReview = document.querySelector('#submit');
    submitReview.addEventListener('click', async (event) => {
      const userReview = document.querySelector('#user_review').value;
      const textReview = document.querySelector('#review_area').value;
      event.preventDefault();

      const reviewValue = {
        id: url.id,
        name: userReview,
        review: textReview,
      };

      const response = await RestaurantDbSource.addingReview(reviewValue);
      const content = document.querySelector('#content_review');

      content.innerHTML = createReviewTemplate(response.customerReviews);
    });
  },
};

export default InputReview;
