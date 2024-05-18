const assert = require("assert");

Feature("Liking Restaurant");

Scenario("liking a restaurant", async ({ I }) => {
  I.amOnPage("/");

  I.seeElement(".restaurant_details a");
  const firstRestaurant = locate(".restaurant_name").first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(locate(".restaurant_details a").first());

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/like");

  I.seeElement(".restaurant_item");
  const likedRestaurantTitle = await I.grabTextFrom(".restaurant_name");

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario("disliking a restaurant", async ({ I }) => {
  I.amOnPage("/");

  I.seeElement(".restaurant_details a");
  const firstRestaurant = locate(".restaurant_name").first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(locate(".restaurant_details a").first());

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/like");

  I.seeElement(".restaurant_details a");
  I.click(locate(".restaurant_details a").first());

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/like");

  I.dontSeeElement(".restaurant_item");
  const likedRestaurants = await I.grabNumberOfVisibleElements(
    ".restaurant_name"
  );
  assert.strictEqual(likedRestaurants, 0);
});

Scenario("Sorting restaurants name", async ({ I }) => {
  I.amOnPage("/");

  I.seeElement("#sort_name");
  I.click("#sort_name");

  const sortedRestaurantNames = await I.grabTextFromAll(".restaurant_name");

  const isSorted = isSortedAscending(sortedRestaurantNames);
  assert.strictEqual(
    isSorted,
    true,
    "Restaurants names are not sorted correctly"
  );
});

function isSortedAscending(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}
