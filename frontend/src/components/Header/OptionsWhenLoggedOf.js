import React from "react";
import styles from "./Header.module.css";

function OptionsWhenLoggedOf() {
  return (
    <>
      <button className={styles.option}>Log In</button>
      <button className={`${styles.option} ${styles["sign-up"]}`}>
        Sign Up
      </button>
    </>
  );
}

export default OptionsWhenLoggedOf;
