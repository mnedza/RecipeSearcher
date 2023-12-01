import React from "react";
import { Link } from "react-router-dom";

import NavLinks from "./NavLinks";
import Header from "./Header";

import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <Header>
      <nav className={`${styles["nav-content"]} wrapper`}>
        <Link to="/" className={`${styles.logo} ${styles.option}`}>
          Recipe Search App
        </Link>

        <nav className={styles["nav-links"]}>
          <NavLinks />
        </nav>
      </nav>
    </Header>
  );
};

export default Navigation;
