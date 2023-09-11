import React from "react";
import styles from "./Header.module.css";

function OptionsWhenLoggedIn() {
  return (
    <>
      <button className={styles.option}>Favorites</button>
      <button className={styles.option}>Log Out</button>
    </>
  );
}

export default OptionsWhenLoggedIn;
