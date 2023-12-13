import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import styles from "./NavLinks.module.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const history = useHistory();

  const signOutHandler = () => {
    auth.signOut();
    history.push("/");
  };

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
      <NavLink to={`/favorites/${userId}`} className={styles["nav-link"]}>
        Favorites
      </NavLink>

      <NavLink to={`/profile/${userId}`} className={styles["nav-link"]}>
        Profile
      </NavLink>

      <li
        to="/sign-out"
        className={styles["nav-link"]}
        onClick={signOutHandler}
      >
        Sign Out
      </li>
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
      {auth.isSignedIn && linksToShowWhenLoggedIn}
      {!auth.isSignedIn && linksToShowWhenNotLoggedIn}
    </>
  );
};

export default NavLinks;
