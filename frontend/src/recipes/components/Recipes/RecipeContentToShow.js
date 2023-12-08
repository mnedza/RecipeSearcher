import React, { useContext, useState } from "react";
import { AuthContext } from "../../../shared/context/auth-context";

import styles from "./RecipeContentToShow.module.css";

const RecipeContentToShow = ({ loadedRecipe }) => {
  const { rId, name, instructions, ingredients } = loadedRecipe;
  const auth = useContext(AuthContext);
  const [isAdded, setIsAdded] = useState(false);

  let status;
  if (isAdded) {
    status = "Remove from favorites";
  } else {
    status = "Add to favorites";
  }

  const changeStatusHandler = (event) => {
    event.preventDefault();
    setIsAdded((prevState) => !prevState);
    
    console.log(`Status changed to ${isAdded}`);
  };

  return (
    <>
      <div>
        <h1 className={styles.title}>Recipe Details page !!!</h1>

        {auth.isSignedIn && (
          <form onSubmit={changeStatusHandler}>
            <button type="submit">{status}</button>
          </form>
        )}

        <p>Recipe Id --- {rId}</p>
        <p>Name --- {name}</p>
        <p>ingredients --- {ingredients}</p>
        <p>Instructions --- {instructions}</p>
      </div>
    </>
  );
};

export default RecipeContentToShow;
