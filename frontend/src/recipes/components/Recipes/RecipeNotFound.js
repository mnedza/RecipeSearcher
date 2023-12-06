import React from "react";

import styles from "./RecipeNotFound.module.css";
import Card from "../../../shared/components/UIElements/Card";

const RecipeNotFound = () => {
  return (
    <Card>
      <h1 className={styles.info}>Recipe not found.</h1>
    </Card>
  );
};

export default RecipeNotFound;
