import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavLinks.module.css";

const NavLinks = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const isLoggedIn = true;
  const linksToShowEverytime = (
    <>
      <NavLink to="/" exact className={styles["nav-link"]}>
        Home
      </NavLink>

      <NavLink to="/search" className={styles["nav-link"]}>
        Search
      </NavLink>

      <NavLink to="/recipes" className={styles["nav-link"]}>
        Recipes
      </NavLink>
    </>
  );

  const linksToShowWhenLoggedIn = (
    <>
      <NavLink to="/favorites/u1" className={styles["nav-link"]}>
        Favorites
      </NavLink>

      <NavLink to="/profile/u1" className={styles["nav-link"]}>
        Profile
      </NavLink>
      <NavLink to="/sign-out" className={styles["nav-link"]}>
        Sign Out
      </NavLink>
    </>
  );

  const linksToShowWhenNotLoggedIn = (
    <>
      <NavLink to="/sign-in" className={styles["nav-link"]}>
        Sign In
      </NavLink>

      <NavLink
        to="/sign-up"
        className={`${styles["nav-link"]} ${styles["sign-up"]}`}
      >
        Sign Up
      </NavLink>
    </>
  );

  return (
    <>
      {linksToShowEverytime}
      {isLoggedIn && linksToShowWhenLoggedIn}
      {!isLoggedIn && linksToShowWhenNotLoggedIn}
    </>
  );
};

export default NavLinks;
