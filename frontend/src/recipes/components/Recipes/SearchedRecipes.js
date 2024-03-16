import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AllRecipes from "./AllRecipes";
import LoadingAnimation from "../../../shared/components/UIElements/LoadingAnimation";

import styles from "./SearchedRecipes.module.css";

const SearchedRecipes = () => {
  const location = useLocation();
  // eslint-disable-next-line
  const recipes = location.state ? location.state.recipes : [];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (recipes.length > 0) {
      setIsLoading(false);
    }
  }, [recipes]);

  return (
    <>
      {isLoading && !recipes && <LoadingAnimation />}
      {!isLoading ? (
        <AllRecipes recipes={recipes} />
      ) : (
        <div className="wrapper">
          <h1 className={styles.h1}>No recipes found.</h1>
        </div>
      )}
    </>
  );
};

export default SearchedRecipes;
