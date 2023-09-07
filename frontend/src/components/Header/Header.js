import React from "react";
import styles from "./Header.module.css";
import OptionsWhenLoggedOf from "./OptionsWhenLoggedOf";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles["header-content"]} wrapper`}>
        <div className={styles.logo}>
          <p>Recipe Search App</p>
        </div>

        <div className={styles.options}>
          <OptionsWhenLoggedOf />
        </div>
      </div>
    </header>
  );
};

export default Header;
