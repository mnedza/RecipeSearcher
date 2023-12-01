import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavLinks.module.css";

const NavLinks = () => {
  return (
    <>
      <NavLink to="/" exact className={styles["nav-link"]}>
        Home
      </NavLink>

      <NavLink to="/recipes" className={styles["nav-link"]}>
        Recipes
      </NavLink>

      <NavLink to="/search" className={styles["nav-link"]}>
        Search
      </NavLink>

      <NavLink to="/sign-in" className={styles["nav-link"]}>
        Sign In
      </NavLink>

      <NavLink to="/sign-up" className={`${styles["nav-link"]} ${styles["sign-up"]}`}>
        Sign Up
      </NavLink>

      {/* <NavLink to="/sign-up" className={styles.option}>
        Sign Out
      </NavLink> */}

      {/* <NavLink to="/favorites" className={styles.option}>
        Favorites
      </NavLink> */}

      {/* <NavLink to="/profile/userId" className={styles.option}>
        Profile
      </NavLink> */}
    </>
  );
};

export default NavLinks;
