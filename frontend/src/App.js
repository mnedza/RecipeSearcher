import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// shared
import Home from "./shared/components/Home/Home";
import Navigation from "./shared/components/Navigation/Navigation";
import Footer from "./shared/components/Footer/Footer";

// recipes
import Search from "./recipes/pages/Search";
import Recipes from "./recipes/pages/Recipes";

// user
import SignIn from "./user/pages/SignIn";
import SignUp from "./user/pages/SignUp";
import SignOut from "./user/pages/SignOut";
import Favorites from "./recipes/pages/Favorites";
import Profile from "./user/pages/Profile";
// import UsersList from "./user/pages/UsersList";

const INITIAL_RECIPES = [
  {
    id: 1,
    name: "Scrambled Eggs",
    ingredients: ["eggs", "salt", "pepper"],
    instructions:
      "Whisk eggs, add salt and pepper, cook in a pan until scrambled.",
    url: "https://cdn.pixabay.com/photo/2011/04/06/09/24/scrambled-eggs-6128_1280.jpg",
  },
  {
    id: 2,
    name: "Spaghetti Bolognese",
    ingredients: ["spaghetti pasta", "ground beef", "onion", "tomato sauce"],
    instructions:
      "Cook spaghetti, sauté ground beef and onion, add tomato sauce, mix, and serve with spaghetti.",
    url: "https://cdn.pixabay.com/photo/2016/08/19/09/24/spaghetti-1604836_1280.jpg",
  },
  {
    id: 3,
    name: "Caesar Salad",
    ingredients: [
      "romaine lettuce",
      "croutons",
      "parmesan cheese",
      "Caesar dressing",
    ],
    instructions:
      "Chop lettuce, add croutons and parmesan cheese, drizzle with Caesar dressing, and toss to combine.",
    url: "https://natashaskitchen.com/wp-content/uploads/2019/01/Caesar-Salad-Recipe-3.jpg",
  },
  {
    id: 4,
    name: "Chicken Curry",
    ingredients: ["chicken breast", "curry powder", "onion", "coconut milk"],
    instructions:
      "Cut chicken and onion, sauté chicken with onion, add curry powder and coconut milk, simmer until cooked.",
    url: "https://hips.hearstapps.com/del.h-cdn.co/assets/17/31/1501791674-delish-chicken-curry-horizontal.jpg?crop=0.665xw:0.998xh;0.139xw,0.00240xh&resize=1200:*",
  },
  {
    id: 5,
    name: "Pancakes",
    ingredients: ["flour", "milk", "eggs", "sugar", "baking powder"],
    instructions:
      "Mix flour, milk, eggs, sugar, and baking powder. Cook spoonfuls of batter on a hot griddle until golden brown.",
    url: "https://lilluna.com/wp-content/uploads/2022/09/easy-pancakes3-resize-10.jpg",
  },
  {
    id: 6,
    name: "Fruit Smoothie",
    ingredients: ["banana", "strawberries", "blueberries", "yogurt", "honey"],
    instructions:
      "Blend banana, strawberries, blueberries, yogurt, and honey until smooth. Serve chilled.",
    url: "https://food.unl.edu/recipes/strawberry-banana-smoothie.jpg",
  },
];

const App = () => {
  const recipes = INITIAL_RECIPES;
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/recipes">
          <Recipes recipes={recipes} />
        </Route>

        <Route path="/search">
          <Search />
        </Route>

        <Route path="/sign-in">
          <SignIn />
        </Route>

        <Route path="/sign-up">
          <SignUp />
        </Route>

        <Route path="/sign-out">
          <SignOut />
        </Route>

        <Route path="/favorites">
          <Favorites />
        </Route>

        <Route path="/profile/u1">
          <Profile />
        </Route>

        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
