import React, { useState, useEffect, useContext } from "react";
import UserRecipes from "../components/Recipes/UserRecipes";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingAnimation from "../../shared/components/UIElements/LoadingAnimation";

const Favorites = (props) => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const [favRecipes, setFavRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const path = `favorites/${userId}`;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/favorites/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setFavRecipes(data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <UserRecipes recipes={favRecipes} path={path}>
          {props.children}
        </UserRecipes>
      )}
    </>
  );
};

export default Favorites;
