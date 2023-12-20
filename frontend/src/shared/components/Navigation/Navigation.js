import React, { useState } from "react";
import { Link } from "react-router-dom";

import NavLinks from "./NavLinks";
import Header from "./Header";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

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
          <Link to="/">Recipe Search App</Link>

          <nav className={styles["nav-links"]}>
            <NavLinks onClick={hideSideDrawerHandler} />
          </nav>

          <button className={styles.hamburger} onClick={showSideDrawerHandler}>
            Toggle SideBar
          </button>
        </nav>
      </Header>
    </>
  );
};

export default Navigation;
