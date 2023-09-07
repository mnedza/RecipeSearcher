import React from "react";
import styles from "./Header.module.css";

function OptionsWhenLoggedIn() {
  return (
    <>
      <button className={styles.option}>Favorites</button>
    </>
  );
}

export default OptionsWhenLoggedIn;
