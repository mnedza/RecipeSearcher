import React, { useState, useEffect, useContext } from "react";
import UserRecipes from "../components/Recipes/UserRecipes";
import { AuthContext } from "../../shared/context/auth-context";

const Favorites = (props) => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const path = `favorites/${userId}`;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/favorites/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const responseData = await response.json();
        setRecipes(responseData.favorites);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };

    fetchRecipes();
  }, [userId]);

  return (
    <>
      <UserRecipes recipes={recipes} path={path}>
        {props.children}
      </UserRecipes>
    </>
  );
};

export default Favorites;
