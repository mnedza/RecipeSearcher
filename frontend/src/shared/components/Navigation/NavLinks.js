import React, { useContext} from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import styles from "./NavLinks.module.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const history = useHistory();

  const signOutHandler = () => {
    auth.signOut();
    history.push("/");
    props.onClick();
  };

  const linksForAdmin = (
    <>
      <NavLink
        to="/admin"
        exact
        className={styles["nav-link-admin"]}
        onClick={props.onClick}
      >
        Admin
      </NavLink>
    </>
  );

  const linksToShowEverytime = (
    <>
      <NavLink
        to="/"
        exact
        className={styles["nav-link"]}
        onClick={props.onClick}
      >
        Home
      </NavLink>

      <NavLink
        to="/search"
        className={styles["nav-link"]}
        onClick={props.onClick}
      >
        Search
      </NavLink>

      <NavLink
        to="/recipes"
        className={styles["nav-link"]}
        onClick={props.onClick}
      >
        Recipes
      </NavLink>
    </>
  );

  const linksToShowWhenLoggedIn = (
    <>
      <NavLink
        to={`/favorites/${userId}`}
        className={styles["nav-link"]}
        onClick={props.onClick}
      >
        Favorites
      </NavLink>

      <NavLink
        to={`/profile/${userId}`}
        className={styles["nav-link"]}
        onClick={props.onClick}
      >
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
      <NavLink
        to="/sign-in"
        className={styles["nav-link"]}
        onClick={props.onClick}
      >
        Sign In
      </NavLink>

      <NavLink
        to="/sign-up"
        className={`${styles["nav-link"]} ${styles["sign-up"]}`}
        onClick={props.onClick}
      >
        Sign Up
      </NavLink>
    </>
  );

  return (
    <>
      {auth.isSignedIn && auth.isAdmin && linksForAdmin}
      {linksToShowEverytime}
      {auth.isSignedIn && linksToShowWhenLoggedIn}
      {!auth.isSignedIn && linksToShowWhenNotLoggedIn}
    </>
  );
};

export default NavLinks;
