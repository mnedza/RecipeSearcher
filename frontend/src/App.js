import { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";

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

const INITIAL_FILTERS = [
  "Eggs",
  "Vege",
  "Apples",
  "Bananas",
  "Cheese",
  "Carrots",
  "Tomatoes",
  "Potatoes",
  "Onions",
  "Broccoli",
  "Spinach",
  "Milk",
  "Oranges",
  "Grapes",
  "Strawberries",
  "Chicken",
  "Salmon",
];

// const [initialFilters, setInitialFilters] = useState([
//   "Eggs",
//   "Vege",
//   "Apples",
//   "Bananas",
//   "Cheese",
//   "Carrots",
//   "Tomatoes",
//   "Potatoes",
//   "Onions",
//   "Broccoli",
//   "Spinach",
//   "Milk",
//   "Oranges",
//   "Grapes",
//   "Strawberries",
//   "Chicken",
//   "Salmon",
// ]);

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  // const [filters, setFilters] = useState(INITIAL_FILTERS);

  let isLoggedIn = false;
  const recipes = INITIAL_RECIPES;
  const filters = INITIAL_FILTERS;

  const [currentView, setCurrentView] = useState("Main");

  const showRegistration = () => {
    setCurrentView("Registration");
  };

  const showLogin = () => {
    setCurrentView("Login");
  };

  const showMain = () => {
    setCurrentView("Main");
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        showRegistration={showRegistration}
        showLogin={showLogin}
      />
      {currentView === "Registration" && <Registration />}
      {currentView === "Login" && <Login />}
      {currentView === "Main" && <Main recipes={recipes} filters={filters} />}
      <Footer />
    </>
  );
}

export default App;
