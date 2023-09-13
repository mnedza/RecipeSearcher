import React from "react";
import styles from "./Header.module.css";
import OptionsWhenLoggedOf from "./OptionsWhenLoggedOf";
import OptionsWhenLoggedIn from "./OptionsWhenLoggedIn";

const Header = (props) => {
  const handleLogoClick = () => {
    if (props.showMain) {
      props.showMain();
    }
  };

  return (
    <header className={styles.header}>
      <div className={`${styles["header-content"]} wrapper`}>
        <button
          className={`${styles.logo} ${styles.option}`}
          onClick={handleLogoClick}
        >
          Recipe Search App
        </button>

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
