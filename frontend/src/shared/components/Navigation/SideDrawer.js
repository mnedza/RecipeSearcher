import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./SideDrawer.module.css";

const SideDrawer = (props) => {
  const sideDrawerRef = useRef(null);

  const content = (
    <CSSTransition
      nodeRef={sideDrawerRef}
      in={props.show}
      timeout={400}
      classNames={{
        enter: styles["animation-right-enter"],
        enterActive: styles["animation-right-enter-active"],
        exit: styles["animation-right-exit"],
        exitActive: styles["animation-right-exit-active"],
      }}
      mountOnEnter
      unmountOnExit
    >
      <aside ref={sideDrawerRef} className={styles["side-drawer"]} onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.querySelector("#side-drawer"));
};

export default SideDrawer;
