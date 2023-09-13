import React from "react";
import styles from "./Header.module.css";

const OptionsWhenLoggedOf = (props) => {
  return (
    <>
      <button className={styles.option} onClick={props.showLogin}>
        Log In
      </button>
      <button
        className={`${styles.option} ${styles["sign-up"]}`}
        onClick={props.showRegistration}
      >
        Sign Up
      </button>
    </>
  );
};

export default OptionsWhenLoggedOf;
