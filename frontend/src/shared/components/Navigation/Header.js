import React from "react";

import styles from "./Header.module.css";

const Header = (props) => {
  return <header className={styles.header}>{props.children}</header>;
};

export default Header;
