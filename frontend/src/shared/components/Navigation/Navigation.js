import React, { useState } from "react";
import { Link } from "react-router-dom";

import NavLinks from "./NavLinks";
import Header from "./Header";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import LogoSVG from "../../../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

import styles from "./Navigation.module.css";

const Navigation = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const showSideDrawerHandler = () => {
    setShowDrawer(true);
  };

  const hideSideDrawerHandler = () => {
    setShowDrawer(false);
  };

  return (
    <>
      {showDrawer && <Backdrop onClick={hideSideDrawerHandler} />}
      <SideDrawer show={showDrawer}>
        <nav className={styles["side-drawer-nav"]}>
          <NavLinks onClick={hideSideDrawerHandler} />
        </nav>
      </SideDrawer>
      <Header>
        <nav className={`${styles["nav-content"]} wrapper`}>
          <div className={styles["logo-link"]}>
            <div className={styles["logo-container"]}>
              <img
                src={LogoSVG}
                className={styles.logo}
                alt="Logo Recipe Searcher"
              />
              <Link to="/">
                <span className={styles["logo-text"]}>RecipeSearcher</span>
              </Link>
            </div>
          </div>

          <nav className={styles["nav-links"]}>
            <NavLinks onClick={hideSideDrawerHandler} />
          </nav>

          <button
            className={styles["hamburger"]}
            onClick={showSideDrawerHandler}
          >
            <FontAwesomeIcon
              icon={faBarsStaggered}
              className={styles["bars"]}
            />
          </button>
        </nav>
      </Header>
    </>
  );
};

export default Navigation;
