import RestaurantItem from '../views/pages/restaurant-item';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';

const routes = {
  '/': RestaurantItem,
  '/restaurant-item': RestaurantItem,
  '/detail/:id': Detail,
  '/like': Like,
};

export default routes;
