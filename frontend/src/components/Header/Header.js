import React from "react";
import styles from "./Header.module.css";
import OptionsWhenLoggedOf from "./OptionsWhenLoggedOf";
import OptionsWhenLoggedIn from "./OptionsWhenLoggedIn";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <div className={`${styles["header-content"]} wrapper`}>
        <div className={styles.logo}>
          <p>Recipe Search App</p>
        </div>

        <div className={styles.options}>
          {props.isLoggedIn && <OptionsWhenLoggedIn />}
          {!props.isLoggedIn && (
            <OptionsWhenLoggedOf
              showRegistration={props.showRegistration}
              showLogin={props.showLogin}
            />
          )}
        </div>
      </div>  
    </header>
  );
};

export default Header;
