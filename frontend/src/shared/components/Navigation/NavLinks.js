import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";

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
        <FontAwesomeIcon icon={faUser} />
        {/* Admin */}
        <span className={styles["link-span"]}>Admin</span>
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
        <FontAwesomeIcon icon={faHome} />
        <span className={styles["link-span"]}>Home</span>
      </NavLink>

      <NavLink
        to="/search"
        className={styles["nav-link"]}
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        {/* Search */}
        <span className={styles["link-span"]}>Search</span>
      </NavLink>

      <NavLink
        to="/recipes"
        className={styles["nav-link"]}
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={faBook} />
        {/* Recipes */}
        <span className={styles["link-span"]}>Recipes</span>
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
        <FontAwesomeIcon icon={faStar} />
        {/* Favorites */}
        <span className={styles["link-span"]}>Favorites</span>
      </NavLink>

      <NavLink
        to={`/profile/${userId}`}
        className={styles["nav-link"]}
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={faAddressCard} />
        {/* Profile */}
        <span className={styles["link-span"]}>Profile</span>
      </NavLink>

      <li
        to="/sign-out"
        className={`${styles["nav-link"]} ${styles["sign-out"]}`}
        onClick={signOutHandler}
      >
        <FontAwesomeIcon icon={faRightToBracket} />
        {/* Sign Out */}
        <span className={styles["link-span"]}>SignOut</span>
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
        <FontAwesomeIcon icon={faKey} />
        {/* Sign In */}
        <span className={styles["link-span"]}>Sign In</span>
      </NavLink>

      <NavLink
        to="/sign-up"
        className={`${styles["nav-link"]} ${styles["sign-up"]}`}
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={faRightToBracket} />

        {/* Sign Up */}

        <span className={styles["link-span"]}>Sign Up</span>
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
