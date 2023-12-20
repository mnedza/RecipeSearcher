import React, { useState, useEffect, useContext } from "react";
import UserRecipes from "../components/Recipes/UserRecipes";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingAnimation from "../../shared/components/UIElements/LoadingAnimation";

const Favorites = (props) => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const path = `favorites/${userId}`;
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/favorites/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const responseData = await response.json();
        setRecipes(responseData.favorites);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
      setIsLoading(false);
    };

    fetchRecipes();
  }, [userId, auth.token]);

  return (
    <>
      {isLoading && <LoadingAnimation />}
      <UserRecipes recipes={recipes} path={path}>
        {props.children}
      </UserRecipes>
    </>
  );
};

export default Favorites;
